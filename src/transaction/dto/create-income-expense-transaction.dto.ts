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
	@IsPositive()
	category_id: number

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	wallet_id: number
}
