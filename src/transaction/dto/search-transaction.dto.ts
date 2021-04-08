import { IsNotEmpty, IsString } from 'class-validator'

export class SearchTransactionDto {
	@IsNotEmpty()
	@IsString()
	term: string
}
