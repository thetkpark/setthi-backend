import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

export class CreateIncomeExpenseTransactionDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	amount: number

	@IsNotEmpty()
	@IsDateString()
	date: Date

	@IsNotEmpty()
	@IsNumber()
	category_id: number

	@IsNotEmpty()
	@IsNumber()
	wallet_id: number
}
