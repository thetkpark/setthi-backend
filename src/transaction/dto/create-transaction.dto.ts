import { TransactionType } from '.prisma/client'
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTransactionDto {
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
	@IsEnum(TransactionType)
	transaction_type: TransactionType

	@IsNotEmpty()
	@IsNumber()
	category_id: number

	@IsOptional()
	@IsNumber()
	wallet_id: number

	@IsOptional()
	@IsNumber()
	saving_id: number
}
