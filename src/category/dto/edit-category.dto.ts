import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator'

export class EditCategoryDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	name: string

	@IsNotEmpty()
	@Matches(/\d{1,3}:\d{1,3}:\d{1,3}:\d{1,3}/)
	color: string
}
