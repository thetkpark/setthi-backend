import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateIncomeTransactionDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsNotEmpty()
	@IsNumber()
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
