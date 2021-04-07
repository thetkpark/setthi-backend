import { CategoryType } from '.prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class QueryCategoryDto {
	@IsOptional()
	@IsEnum(CategoryType)
	type?: CategoryType
}
