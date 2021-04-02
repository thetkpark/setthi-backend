import { Wallet } from '.prisma/client'
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { WalletService } from './wallet.service'

@Controller('api')
export class WalletController {
	constructor(private walletService: WalletService) {}

	@Post('wallet')
	@UseGuards(JwtAuthGuard)
	async createWallet(@Body() { name, amount }: CreateWalletDto, @Request() req): Promise<Wallet[]> {
		const userId = req.user.userId
		await this.walletService.createWallet(name, amount, userId)
		return this.walletService.getWallets(userId)
	}
}
