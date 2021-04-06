import { Wallet } from '.prisma/client'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { EditWalletDto } from './dto/edit-wallet.dto'
import { WalletService } from './wallet.service'
import { WalletValidationPipe } from './wallet-validation.pipe'

@Controller('api')
export class WalletController {
	constructor(private walletService: WalletService) {}

	@Post('wallet')
	@UseGuards(JwtAuthGuard)
	async createWallet(@Body() { name, amount }: CreateWalletDto, @Request() req): Promise<Wallet[]> {
		const userId = req.user.userId
		const walletCount = await this.walletService.countWallets(userId)
		if (walletCount === 5) throw new BadRequestException('Limit number of wallets exceeded')
		await this.walletService.createWallet(name, amount, userId)
		return this.walletService.getWallets(userId)
	}

	@Get('wallets')
	@UseGuards(JwtAuthGuard)
	async getWallets(@Request() req): Promise<Wallet[]> {
		return this.walletService.getWallets(req.user.userId)
	}

	@Patch('wallet/:id')
	@UseGuards(JwtAuthGuard)
	async editWallet(
		@Param('id', WalletValidationPipe) wallet: Wallet,
		@Body() { name }: EditWalletDto,
		@Request() req
	): Promise<Wallet[]> {
		const isOwnWallet = await this.walletService.checkWalletOwnership(req.user.userId, wallet.id)
		if (!isOwnWallet) throw new ForbiddenException()
		await this.walletService.editWallet(wallet.id, name)
		return this.walletService.getWallets(req.user.userId)
	}

	@Delete('wallet/:id')
	@UseGuards(JwtAuthGuard)
	async deleteWallet(@Param('id', WalletValidationPipe) wallet: Wallet, @Request() req): Promise<Wallet[]> {
		const isOwnWallet = await this.walletService.checkWalletOwnership(req.user.userId, wallet.id)
		if (!isOwnWallet) throw new ForbiddenException()
		await this.walletService.deleteWallet(wallet.id)
		return this.walletService.getWallets(req.user.userId)
	}
}
