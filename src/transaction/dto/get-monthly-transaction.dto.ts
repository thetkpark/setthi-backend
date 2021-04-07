import { IsOptional } from 'class-validator'

export class GetMonthlyTransactionDto {
	@IsOptional()
	month: string
}
