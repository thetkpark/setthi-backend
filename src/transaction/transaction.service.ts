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

	async getTimelineTransactions(owner_id: number) {
		return this.prisma.transaction.findMany({
			where: {
				owner_id,
			},
			orderBy: {
				date: 'desc',
			},
			take: 10,
			select: {
				id: true,
				title: true,
				amount: true,
				date: true,
				transaction_type: true,
				category: {
					select: {
						id: true,
						name: true,
						color: true,
						is_deleted: true,
						type: true,
						owner_id: true,
					},
				},
				saving: {
					select: {
						id: true,
						title: true,
						is_finish: true,
						current_amount: true,
						target_amount: true,
						start_date: true,
						end_date: true,
						owner_id: true,
					},
				},
				wallet: {
					select: {
						id: true,
						name: true,
						amount: true,
						is_deleted: true,
						owner_id: true,
					},
				},
			},
		})
	}

	async getMontlyTransaction(owner_id: number, startDate: Date, endDate: Date) {
		return this.prisma.transaction.findMany({
			where: {
				AND: [
					{ owner_id },
					{
						date: {
							gte: startDate,
							lte: endDate,
						},
					},
				],
			},
			orderBy: {
				date: 'desc',
			},
			select: {
				id: true,
				title: true,
				amount: true,
				date: true,
				transaction_type: true,
				category: {
					select: {
						id: true,
						name: true,
						color: true,
						is_deleted: true,
						type: true,
						owner_id: true,
					},
				},
				saving: {
					select: {
						id: true,
						title: true,
						is_finish: true,
						current_amount: true,
						target_amount: true,
						start_date: true,
						end_date: true,
						owner_id: true,
					},
				},
				wallet: {
					select: {
						id: true,
						name: true,
						amount: true,
						is_deleted: true,
						owner_id: true,
					},
				},
			},
		})
	}
}
