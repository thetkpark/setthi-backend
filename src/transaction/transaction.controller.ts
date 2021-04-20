import { CategoryType, TransactionType } from '.prisma/client'
import { BadRequestException, Body, Controller, ForbiddenException, Get, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CategoryService } from 'src/category/category.service'
import { SavingService } from 'src/saving/saving.service'
import { WalletService } from 'src/wallet/wallet.service'
import { CreateExpenseSavingTransactionDto } from './dto/create-expense-saving-transaction.dto'
import { CreateIncomeExpenseTransactionDto } from './dto/create-income-expense-transaction.dto'
import { CreateSavingTransactionDto } from './dto/create-saving-transaction.dto'
import { DateValidationPipe } from './monthly-transaction-date.pipe'
import { TransactionService } from './transaction.service'
import { User } from 'src/decorators/user.decorator'
import { SearchTransactionDto } from './dto/search-transaction.dto'

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
	async getTransactions(@User() userId: number) {
		return this.transactionService.getTimelineTransactions(userId)
	}

	@Get('transactions')
	@UseGuards(JwtAuthGuard)
	async getMonthlyTransaction(@Query('date', DateValidationPipe) date: any, @User() userId: number) {
		return this.transactionService.getMontlyTransaction(userId, date.startDate, date.endDate)
	}

	@Get('transactions/search')
	@UseGuards(JwtAuthGuard)
	async searchTransaction(@Query() { term }: SearchTransactionDto, @User() userId: number) {
		return this.transactionService.searchTransactions(userId, term)
	}

	@Post('transaction/income')
	@UseGuards(JwtAuthGuard)
	async createIncomeTransaction(
		@Body()
		{ title, date, amount, category_id, wallet_id }: CreateIncomeExpenseTransactionDto,
		@User() userId: number
	) {
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

		const transactions = await this.transactionService.getTimelineTransactions(userId)
		return { transactions }
	}

	@Post('transaction/expense')
	@UseGuards(JwtAuthGuard)
	async createExpenseTransaction(
		@Body()
		{ title, date, amount, category_id, wallet_id }: CreateIncomeExpenseTransactionDto,
		@User() userId: number
	) {
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

		const transactions = await this.transactionService.getTimelineTransactions(userId)
		return { transactions }
	}

	@Post('transaction/saving')
	@UseGuards(JwtAuthGuard)
	async createSavingTransaction(
		@Body()
		{ title, date, amount, category_id, wallet_id, saving_id }: CreateSavingTransactionDto,
		@User() userId: number
	) {
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

		const ops = await Promise.all(transactionOps)

		const transactions = await this.transactionService.getTimelineTransactions(userId)

		return {
			transactions,
			saving_finish: ops[2].is_finish,
			saving_name: ops[2].title,
		}
	}

	@Post('transaction/expense-saving')
	@UseGuards(JwtAuthGuard)
	async createExpanseSavingTransaction(
		@Body()
		{ title, date, amount, category_id, saving_id }: CreateExpenseSavingTransactionDto,
		@User() userId: number
	) {
		const ownershipOps: Promise<boolean>[] = [
			this.categoryService.checkCategoryOwnershipAndType(userId, category_id, CategoryType.EXPENSE),
			this.savingService.checkSavingOwnershipAndFinish(userId, saving_id),
		]
		const ownershipCheck = await Promise.all(ownershipOps)
		if (ownershipCheck.some(ele => ele === false)) throw new ForbiddenException()

		const saving = await this.savingService.getSaving(saving_id)
		if (saving.current_amount.toNumber() !== amount)
			throw new BadRequestException('The amount is does not match the saving amount')

		const transactionOps: Promise<any>[] = [
			this.transactionService.createTransaction(
				title,
				amount,
				category_id,
				new Date(date),
				saving_id,
				TransactionType.EXPENSE_FROM_SAVING,
				null,
				userId
			),
			this.savingService.resetCurrentAmount(saving_id),
		]

		await Promise.all(transactionOps)

		const transactions = await this.transactionService.getTimelineTransactions(userId)
		return { transactions }
	}
}
