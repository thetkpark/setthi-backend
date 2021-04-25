import { Wallet } from '.prisma/client'
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
import { CreateWalletDto } from './dto/create-wallet.dto'
import { EditWalletDto } from './dto/edit-wallet.dto'
import { WalletService } from './wallet.service'
import { WalletValidationPipe } from './wallet-validation.pipe'
import { User } from 'src/decorators/user.decorator'

@Controller('api')
export class WalletController {
	constructor(private walletService: WalletService) {}

	@Post('wallet')
	@UseGuards(JwtAuthGuard)
	async createWallet(@Body() { name, amount }: CreateWalletDto, @User() userId: number): Promise<Wallet[]> {
		const walletCount = await this.walletService.countWallets(userId)
		if (walletCount === 5) throw new BadRequestException('Limit number of wallets exceeded')
		await this.walletService.createWallet(name, amount, userId)
		return this.walletService.getWallets(userId)
	}

	@Get('wallets')
	@UseGuards(JwtAuthGuard)
	async getWallets(@User() userId: number) {
		return this.walletService.getWallets(userId)
	}

	@Get('category-graph')
	@UseGuards(JwtAuthGuard)
	async getCategoryPercentage(@User() userId: number) {
		return this.walletService.getCategoryPercentage(userId)
	}

	@Get('expense-graph')
	@UseGuards(JwtAuthGuard)
	async getIncomeExpenseGraphOnWalletsScreen(@User() userId: number) {
		return this.walletService.getIncomeExpenseGraphData(userId)
	}

	@Patch('wallet/:id')
	@UseGuards(JwtAuthGuard)
	async editWallet(
		@Param('id', WalletValidationPipe) wallet: Wallet,
		@Body() { name }: EditWalletDto,
		@User() userId: number
	): Promise<Wallet[]> {
		const isOwnWallet = await this.walletService.checkWalletOwnership(userId, wallet.id)
		if (!isOwnWallet) throw new ForbiddenException()
		await this.walletService.editWallet(wallet.id, name)
		return this.walletService.getWallets(userId)
	}

	@Delete('wallet/:id')
	@UseGuards(JwtAuthGuard)
	async deleteWallet(@Param('id', WalletValidationPipe) wallet: Wallet, @User() userId: number): Promise<Wallet[]> {
		const isOwnWallet = await this.walletService.checkWalletOwnership(userId, wallet.id)
		if (!isOwnWallet) throw new ForbiddenException()
		const numberOfWallets = await this.walletService.countWallets(userId)
		if (numberOfWallets === 1) throw new BadRequestException('Cannot delete last wallet')
		await this.walletService.deleteWallet(wallet.id)
		return this.walletService.getWallets(userId)
	}
}
