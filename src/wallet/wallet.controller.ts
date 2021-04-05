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
	Request,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { EditWalletDto } from './dto/edit-wallet.dto'
import { WalletService } from './wallet.service'

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
	async editWallet(@Param() params, @Body() { name }: EditWalletDto, @Request() req): Promise<Wallet[]> {
		const walletId = parseInt(params.id)
		const isOwnWallet = await this.walletService.checkWalletOwnership(req.user.userId, walletId)
		if (!isOwnWallet) throw new ForbiddenException()
		await this.walletService.editWallet(walletId, name)
		return this.walletService.getWallets(req.user.userId)
	}

	@Delete('wallet/:id')
	@UseGuards(JwtAuthGuard)
	async deleteWallet(@Param() params, @Request() req): Promise<Wallet[]> {
		const walletId = parseInt(params.id)
		const isOwnWallet = await this.walletService.checkWalletOwnership(req.user.userId, walletId)
		if (!isOwnWallet) throw new ForbiddenException()
		await this.walletService.deleteWallet(walletId)
		return this.walletService.getWallets(req.user.userId)
	}
}
