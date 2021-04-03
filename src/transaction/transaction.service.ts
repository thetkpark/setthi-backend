import { Transaction, TransactionType } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TransactionService {
	constructor(private prisma: PrismaService) {}

	async createTransaction(
		title: string,
		amount: number,
		category_id: number,
		date: Date,
		saving_id: number,
		transaction_type: TransactionType,
		wallet_id: number,
		owner_id: number
	): Promise<Transaction> {
		return this.prisma.transaction.create({
			data: {
				title,
				amount,
				category_id,
				date,
				transaction_type,
				wallet_id,
				saving_id,
				owner_id,
			},
		})
	}

	async getTransactions(owner_id: number): Promise<Transaction[]> {
		return this.prisma.transaction.findMany({
			where: {
				owner_id,
			},
		})
	}
}

// export interface CreateTransactionData {
// 	title: string

// }
