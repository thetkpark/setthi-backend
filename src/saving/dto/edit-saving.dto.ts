import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

export class EditSavingDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	target_amount: number
}
