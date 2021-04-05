import { prisma, TransactionType, Wallet } from '.prisma/client'
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
			orderBy: {
				createdAt: 'asc',
			},
		})
	}

	async checkWalletOwnership(ownerId: number, walletId: number): Promise<boolean> {
		const wallet = await this.prisma.wallet.findFirst({
			where: {
				AND: [{ owner_id: ownerId }, { id: walletId }],
			},
		})
		return wallet ? true : false
	}

	async editWallet(walletId: number, name: string): Promise<Wallet> {
		return this.prisma.wallet.update({
			where: {
				id: walletId,
			},
			data: {
				name,
			},
		})
	}

	async updateWalletAmount(walletId: number, transactionType: TransactionType, amount: number): Promise<Wallet> {
		const wallet = await this.prisma.wallet.findFirst({
			where: {
				id: walletId,
			},
		})
		let walletAmount = wallet.amount.toNumber()

		if (transactionType == TransactionType.INCOME) {
			walletAmount += amount
		} else {
			walletAmount -= amount
		}

		return this.prisma.wallet.update({
			where: {
				id: walletId,
			},
			data: {
				amount: walletAmount,
			},
		})
	}

	async deleteWallet(walletId: number): Promise<Wallet> {
		return this.prisma.wallet.delete({
			where: {
				id: walletId,
			},
		})
	}

	async countWallets(ownerId: number): Promise<number> {
		const count = await this.prisma.wallet.count({
			where: {
				owner_id: ownerId,
			},
		})
		return count
	}

	async getWallet(walletId: number): Promise<Wallet> {
		return this.prisma.wallet.findFirst({
			where: {
				id: walletId,
			},
		})
	}
}
