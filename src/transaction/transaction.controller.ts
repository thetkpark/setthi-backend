import { CategoryType, Transaction, TransactionType } from '.prisma/client'
import { Body, Controller, ForbiddenException, Get, Post, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CategoryService } from 'src/category/category.service'
import { SavingService } from 'src/saving/saving.service'
import { WalletService } from 'src/wallet/wallet.service'
import { CreateIncomeTransactionDto } from './dto/create-income-transaction.dto'
import { TransactionService } from './transaction.service'

@Controller('api')
export class TransactionController {
	constructor(
		private transactionService: TransactionService,
		private walletService: WalletService,
		private savingService: SavingService,
		private categoryService: CategoryService
	) {}

	@Get('timeline')
	@UseGuards(JwtAuthGuard)
	async getTransactions(@Request() req): Promise<Transaction[]> {
		const userId = req.user.userId
		return this.transactionService.getTimelineTransactions(userId)
	}

	@Post('transaction/income')
	@UseGuards(JwtAuthGuard)
	async createIncomeTransaction(
		@Body()
		{ title, date, amount, category_id, wallet_id }: CreateIncomeTransactionDto,
		@Request() req
	): Promise<Transaction[]> {
		const userId = req.user.userId
		const ownershipOps: Promise<boolean>[] = [
			this.walletService.checkWalletOwnership(userId, wallet_id),
			this.categoryService.checkCategoryOwnershipAndType(userId, category_id, CategoryType.INCOME),
		]
		const ownershipCheck = await Promise.all(ownershipOps)
		if (ownershipCheck.some(ele => ele === false)) throw new ForbiddenException()

		const transactionOps: Promise<any>[] = [
			this.transactionService.createTransaction(
				title,
				amount,
				category_id,
				new Date(date),
				null,
				TransactionType.INCOME,
				wallet_id,
				userId
			),
			this.walletService.updateWalletAmount(wallet_id, TransactionType.INCOME, amount),
		]
		await Promise.all(transactionOps)

		return this.transactionService.getTimelineTransactions(userId)
	}
}
