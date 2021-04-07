import { TransactionType, Wallet } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
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
				AND: [{ owner_id: ownerId }, { is_deleted: false }],
			},
			orderBy: {
				createdAt: 'asc',
			},
		})
	}

	async checkWalletOwnership(ownerId: number, walletId: number): Promise<boolean> {
		const wallet = await this.prisma.wallet.findFirst({
			where: {
				AND: [{ owner_id: ownerId }, { id: walletId }, { is_deleted: false }],
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
		return this.prisma.wallet.update({
			where: {
				id: walletId,
			},
			data: {
				is_deleted: true,
			},
		})
	}

	async countWallets(ownerId: number): Promise<number> {
		const count = await this.prisma.wallet.count({
			where: {
				AND: [{ owner_id: ownerId }, { is_deleted: false }],
			},
		})
		return count
	}

	async getWallet(walletId: number): Promise<Wallet> {
		return this.prisma.wallet.findFirst({
			where: {
				AND: [{ id: walletId }, { is_deleted: false }],
			},
		})
	}

	async getTotalBalance(ownerId: number): Promise<number> {
		const balance = await this.prisma.wallet.aggregate({
			sum: {
				amount: true,
			},
			where: {
				AND: [{ owner_id: ownerId }, { is_deleted: false }],
			},
		})
		return balance.sum.amount.toNumber()
	}

	async getExpenseGraphData(owner_id: number) {
		const fromDate = dayjs().utc().startOf('day').subtract(7, 'day').toDate()
		const transaction = await this.prisma.transaction.groupBy({
			by: ['date'],
			having: {
				date: {
					gt: fromDate,
				},
			},
			where: {
				AND: [{ owner_id }, { transaction_type: TransactionType.EXPENSE }],
			},
			sum: {
				amount: true,
			},
			orderBy: {
				date: 'asc',
			},
		})

		let max = 0
		let min = 0
		const data = []
		let dateRunner = dayjs(fromDate).add(1, 'day')

		for (let i = 0; i < transaction.length; i++) {
			const sumAmount = transaction[i].sum.amount.toNumber()
			if (sumAmount > max) max = sumAmount
			if (sumAmount < min) min = sumAmount

			const transactionDate = dayjs(transaction[i].date)
			while (!dateRunner.isSame(transactionDate)) {
				data.push({
					date: dateRunner.format('ddd'),
					amount: 0,
				})
				dateRunner = dateRunner.add(1, 'day')
			}

			data.push({
				date: dateRunner.format('ddd'),
				amount: sumAmount,
			})
			dateRunner = dateRunner.add(1, 'day')
		}

		const index = Math.floor(max.toString().length * 0.7)
		const submax = max / Math.pow(10, index)
		const modmax = Math.ceil(submax) * Math.pow(10, index)

		return {
			top: modmax,
			data,
		}
	}

	async initWallet(owner_id: number) {
		return this.prisma.wallet.create({
			data: {
				name: 'Wallet 1',
				amount: 0,
				owner_id,
			},
		})
	}
}
