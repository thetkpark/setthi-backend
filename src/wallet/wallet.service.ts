import { Wallet } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class WalletService {
	constructor(private prisma: PrismaService) {}

	async createWallet(name: string, amount: number, ownerId: number): Promise<Wallet> {
		return this.prisma.wallet.create({
			data: {
				name,
				amount,
				owner_id: ownerId,
			},
		})
	}

	async getWallets(ownerId: number): Promise<Wallet[]> {
		return this.prisma.wallet.findMany({
			where: {
				owner_id: ownerId,
			},
		})
	}
}
