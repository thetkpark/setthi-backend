import { CategoryType } from '.prisma/client'
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'

export class QueryCategoryDto {
	@IsOptional()
	@IsEnum(CategoryType)
	type?: CategoryType
}
