import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateSavingDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsNotEmpty()
	@IsNumber()
	target_amount: number

	@IsNotEmpty()
	@IsDateString()
	start_date: Date

	@IsNotEmpty()
	@IsDateString()
	end_date: Date
}
