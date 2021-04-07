import { LabelType } from '.prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class QueryLabelDto {
	@IsOptional()
	@IsEnum(LabelType)
	type?: LabelType
}
