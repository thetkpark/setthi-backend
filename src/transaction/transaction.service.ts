import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TransactionService {
	constructor(private prisma: PrismaService) {}

	// async createTransaction() {
	// 	this.prisma.transaction.create({
	// 		data: {},
	// 	})
	// }
}

// export interface CreateTransactionData {
// 	title: string

// }
