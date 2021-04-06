import { CategoryType, Transaction, TransactionType } from '.prisma/client'
import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	Get,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CategoryService } from 'src/category/category.service'
import { SavingService } from 'src/saving/saving.service'
import { WalletService } from 'src/wallet/wallet.service'
import { CreateIncomeExpenseTransactionDto } from './dto/create-income-expense-transaction.dto'
import { CreateSavingTransactionDto } from './dto/create-saving-transaction.dto'
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
		{ title, date, amount, category_id, wallet_id }: CreateIncomeExpenseTransactionDto,
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

	@Post('transaction/expense')
	@UseGuards(JwtAuthGuard)
	async createExpenseTransaction(
		@Body()
		{ title, date, amount, category_id, wallet_id }: CreateIncomeExpenseTransactionDto,
		@Request() req
	): Promise<Transaction[]> {
		const userId = req.user.userId
		const ownershipOps: Promise<boolean>[] = [
			this.walletService.checkWalletOwnership(userId, wallet_id),
			this.categoryService.checkCategoryOwnershipAndType(userId, category_id, CategoryType.EXPENSE),
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
				TransactionType.EXPENSE,
				wallet_id,
				userId
			),
			this.walletService.updateWalletAmount(wallet_id, TransactionType.EXPENSE, amount),
		]

		await Promise.all(transactionOps)

		return this.transactionService.getTimelineTransactions(userId)
	}

	@Post('transaction/saving')
	@UseGuards(JwtAuthGuard)
	async createSavingTransaction(
		@Body()
		{ title, date, amount, category_id, wallet_id, saving_id }: CreateSavingTransactionDto,
		@Request() req
	): Promise<Transaction[]> {
		const userId = req.user.userId

		const ownershipOps: Promise<boolean>[] = [
			this.walletService.checkWalletOwnership(userId, wallet_id),
			this.categoryService.checkCategoryOwnershipAndType(userId, category_id, CategoryType.EXPENSE),
			this.savingService.checkSavingOwnershipAndNotFinish(userId, saving_id),
		]
		const ownershipCheck = await Promise.all(ownershipOps)
		if (ownershipCheck.some(ele => ele === false)) throw new ForbiddenException()

		const saving = await this.savingService.getSaving(saving_id)
		if (saving.target_amount.toNumber() - saving.current_amount.toNumber() < amount)
			throw new BadRequestException('The amount is more than needed to fullfilled the saving')

		const transactionOps: Promise<any>[] = [
			this.transactionService.createTransaction(
				title,
				amount,
				category_id,
				new Date(date),
				saving_id,
				TransactionType.SAVING,
				wallet_id,
				userId
			),
			this.walletService.updateWalletAmount(wallet_id, TransactionType.SAVING, amount),
			this.savingService.addCurrentAmount(saving_id, amount),
		]

		await Promise.all(transactionOps)

		return this.transactionService.getTimelineTransactions(userId)
	}
}
