import { Saving, TransactionType, Wallet } from '.prisma/client'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateSavingDto } from './dto/create-saving.dto'
import { EditSavingDto } from './dto/edit-saving.dto'
import { SavingService } from './saving.service'
import { SavingValidationPipe } from './saving-validation.pipe'
import { User } from 'src/decorators/user.decorator'
import { QuerySavingDto } from './dto/query-saving.dto'
import { WalletService } from 'src/wallet/wallet.service'
import { TransactionService } from 'src/transaction/transaction.service'

@Controller('api')
export class SavingController {
	constructor(
		private savingService: SavingService,
		private walletService: WalletService,
		private transactionService: TransactionService
	) {}

	@Get('savings')
	@UseGuards(JwtAuthGuard)
	async getSavings(@Query() { is_finished, is_used }: QuerySavingDto, @User() userId: number) {
		let isFinish: boolean
		let isUsed: boolean
		if (is_finished) isFinish = is_finished == 'true'
		if (is_used) isUsed = is_used == 'true'
		if (isUsed) isFinish = true
		return this.savingService.getSavings(userId, isFinish, isUsed)
	}

	@Post('saving')
	@UseGuards(JwtAuthGuard)
	async createSaving(
		@Body() { title, target_amount, start_date, end_date }: CreateSavingDto,
		@User() userId: number
	) {
		const savingCount = await this.savingService.countSaving(userId)
		if (savingCount === 5) throw new BadRequestException('Limit number of saving exceeded')
		await this.savingService.createSaving(title, target_amount, new Date(start_date), new Date(end_date), userId)
		return this.savingService.getSavings(userId)
	}

	@Get('finish-unused-saving')
	@UseGuards(JwtAuthGuard)
	async getFinishedUnusedSaving(@User() userId: number): Promise<Saving[]> {
		return this.savingService.getFinishedUnusedSaving(userId)
	}

	@Patch('saving/:id')
	@UseGuards(JwtAuthGuard)
	async editSaving(
		@Param('id', SavingValidationPipe) saving: Saving,
		@Body() { title, target_amount }: EditSavingDto,
		@User() userId: number
	) {
		const isOwnSaving = await this.savingService.checkSavingOwnership(userId, saving.id)
		if (!isOwnSaving) throw new ForbiddenException()
		const currentAmount = saving.current_amount.toNumber()
		if (target_amount < currentAmount)
			throw new BadRequestException("Can't set new target amount lower than current amount")
		const is_finished = currentAmount === target_amount ? true : false
		const editedSaving = await this.savingService.editSaving(saving.id, title, target_amount, is_finished)
		const savings = await this.savingService.getSavings(userId)
		return {
			savings,
			saving_finish: editedSaving.is_finish,
			saving_name: editedSaving.title,
		}
	}

	@Delete('saving/:id')
	@UseGuards(JwtAuthGuard)
	async deleteSaving(@Param('id', SavingValidationPipe) saving: Saving, @User() userId: number) {
		const isOwnSaving = await this.savingService.checkSavingOwnership(userId, saving.id)
		if (!isOwnSaving) throw new ForbiddenException()
		const currentAmount = saving.current_amount.toNumber()
		const data: [Saving, Wallet] = await Promise.all([
			this.savingService.deleteSaving(saving.id),
			this.walletService.updateWalletAmountFromDeleteSaving(userId, currentAmount),
		])
		if (saving.current_amount.toNumber() !== 0) {
			await this.transactionService.createTransaction(
				'Saving Return',
				currentAmount,
				1,
				new Date(),
				null,
				TransactionType.INCOME_FROM_SAVING,
				data[1].id,
				userId
			)
		}
		return this.savingService.getSavings(userId)
	}
}
