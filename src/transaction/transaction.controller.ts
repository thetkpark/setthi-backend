import { Transaction, TransactionType } from '.prisma/client'
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { SavingService } from 'src/saving/saving.service'
import { WalletService } from 'src/wallet/wallet.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { TransactionService } from './transaction.service'

@Controller('api')
export class TransactionController {
	constructor(
		private transactionService: TransactionService,
		private walletService: WalletService,
		private savingService: SavingService
	) {}

	@Get('transactions')
	@UseGuards(JwtAuthGuard)
	async getTransactions(@Request() req): Promise<Transaction[]> {
		const userId = req.user.userId
		return this.transactionService.getTransactions(userId)
	}

	@Post('transaction')
	@UseGuards(JwtAuthGuard)
	async createTransaction(
		@Body() { title, amount, category_id, date, saving_id, transaction_type, wallet_id }: CreateTransactionDto,
		@Request() req
	): Promise<Transaction[]> {
		const userId = req.user.userId
		const ops: Promise<any>[] = []
		if (transaction_type === TransactionType.SAVING) {
			ops.push(this.savingService.updateCurrentAmount(saving_id, amount))
		}
		ops.push(this.walletService.updateWalletAmount(wallet_id, transaction_type, amount))
		ops.push(
			this.transactionService.createTransaction(
				title,
				amount,
				category_id,
				new Date(date),
				saving_id,
				transaction_type,
				wallet_id,
				userId
			)
		)
		await Promise.all(ops)
		return this.transactionService.getTransactions(userId)
	}
}
