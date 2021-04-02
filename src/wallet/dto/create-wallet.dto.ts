import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateWalletDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsNumber()
	amount: number
}
