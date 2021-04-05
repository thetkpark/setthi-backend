import { Transaction, TransactionType } from '.prisma/client'
import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
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

	@Get('timeline')
	@UseGuards(JwtAuthGuard)
	async getTransactions(@Request() req): Promise<Transaction[]> {
		const userId = req.user.userId
		return this.transactionService.getTimelineTransactions(userId)
	}

	@Post('transaction')
	@UseGuards(JwtAuthGuard)
	async createTransaction(
		@Body() { title, amount, category_id, date, saving_id, transaction_type, wallet_id }: CreateTransactionDto,
		@Request() req
	): Promise<Transaction[]> {
		const userId = req.user.userId
		const ops: Promise<any>[] = []
		if (transaction_type === TransactionType.EXPENSE_FROM_SAVING) {
			if (!saving_id) throw new BadRequestException('Saving ID is required')
			const saving = await this.savingService.getSaving(saving_id)
			if (!saving) throw new BadRequestException('Saving is found')

			if (!saving.is_finish) throw new BadRequestException('Saving is not fullfilled yet')
			if (saving.current_amount.toNumber() !== amount)
				throw new BadRequestException('The amount does not match the amount of saving')

			ops.push(this.savingService.resetCurrentAmount(saving_id))
		} else if (transaction_type === TransactionType.SAVING) {
			if (!wallet_id) throw new BadRequestException('Wallet ID is required')
			const wallet = await this.walletService.getWallet(wallet_id)
			if (!wallet) throw new BadRequestException('Wallet is not found')

			if (!saving_id) throw new BadRequestException('Saving ID is required')
			const saving = await this.savingService.getSaving(saving_id)
			if (!saving) throw new BadRequestException('Saving is found')
			const amountLeft = saving.target_amount.toNumber() - saving.current_amount.toNumber()

			if (saving.is_finish) throw new BadRequestException('The saving is fullfilled')
			if (amountLeft < amount)
				throw new BadRequestException(`This saving only need ${amountLeft} to be fullfilled`)

			ops.push(this.savingService.addCurrentAmount(saving_id, amount))
		} else {
			if (!wallet_id) throw new BadRequestException('Wallet ID is required')
			const wallet = await this.walletService.getWallet(wallet_id)
			if (!wallet) throw new BadRequestException('Wallet is not found')

			ops.push(this.walletService.updateWalletAmount(wallet_id, transaction_type, amount))
		}

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

		return this.transactionService.getTimelineTransactions(userId)
	}
}
