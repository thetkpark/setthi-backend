import { CategoryType } from '.prisma/client'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator'

export class CategoryDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	@ApiProperty()
	name: string

	@IsNotEmpty()
	@IsEnum(CategoryType)
	@ApiProperty({ enum: CategoryType })
	type: CategoryType

	@IsNotEmpty()
	@Matches(/\d{1,3}:\d{1,3}:\d{1,3}:\d{1,3}/)
	@ApiProperty()
	color: string
}
