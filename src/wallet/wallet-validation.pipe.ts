import { Wallet } from '.prisma/client'
import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common'
import { WalletService } from './wallet.service'

@Injectable()
export class WalletValidationPipe implements PipeTransform<string, Promise<Wallet>> {
	constructor(private walletService: WalletService) {}
	async transform(id: string) {
		const walletId = parseInt(id)
		const wallet = await this.walletService.getWallet(walletId)
		if (!wallet) throw new NotFoundException('Wallet is not found')
		return wallet
	}
}
