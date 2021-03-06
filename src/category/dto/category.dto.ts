import { CategoryType } from '.prisma/client'
import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator'

export class CategoryDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	name: string

	@IsNotEmpty()
	@IsEnum(CategoryType)
	type: CategoryType

	@IsNotEmpty()
	@Matches(/\d{1,3}:\d{1,3}:\d{1,3}:\d{1,3}/)
	color: string
}
