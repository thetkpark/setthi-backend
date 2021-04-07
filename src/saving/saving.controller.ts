import { Saving } from '.prisma/client'
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
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateSavingDto } from './dto/create-saving.dto'
import { EditSavingDto } from './dto/edit-saving.dto'
import { SavingService } from './saving.service'
import { SavingValidationPipe } from './saving-validation.pipe'
import { User } from 'src/decorators/user.decorator'

@Controller('api')
export class SavingController {
	constructor(private savingService: SavingService) {}

	@Get('savings')
	@UseGuards(JwtAuthGuard)
	async getSavings(@User() userId: number): Promise<Saving[]> {
		return this.savingService.getSavings(userId)
	}

	@Post('saving')
	@UseGuards(JwtAuthGuard)
	async createSaving(
		@Body() { title, target_amount, start_date, end_date }: CreateSavingDto,
		@User() userId: number
	): Promise<Saving[]> {
		const savingCount = await this.savingService.countSaving(userId)
		if (savingCount === 5) throw new BadRequestException('Limit number of saving exceeded')
		await this.savingService.createSaving(title, target_amount, new Date(start_date), new Date(end_date), userId)
		return this.savingService.getSavings(userId)
	}

	@Patch('saving/:id')
	@UseGuards(JwtAuthGuard)
	async editSaving(
		@Param('id', SavingValidationPipe) saving: Saving,
		@Body() { title, target_amount }: EditSavingDto,
		@User() userId: number
	): Promise<Saving[]> {
		const isOwnSaving = await this.savingService.checkSavingOwnership(userId, saving.id)
		if (!isOwnSaving) throw new ForbiddenException()
		await this.savingService.editSaving(saving.id, title, target_amount)
		return this.savingService.getSavings(userId)
	}

	@Delete('saving/:id')
	@UseGuards(JwtAuthGuard)
	async deleteSaving(@Param('id', SavingValidationPipe) saving: Saving, @User() userId: number): Promise<Saving[]> {
		const isOwnSaving = await this.savingService.checkSavingOwnership(userId, saving.id)
		if (!isOwnSaving) throw new ForbiddenException()
		await this.savingService.deleteSaving(saving.id)
		return this.savingService.getSavings(userId)
	}
}
