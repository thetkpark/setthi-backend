import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class EditSavingDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsNotEmpty()
	@IsNumber()
	target_amount: number
}
