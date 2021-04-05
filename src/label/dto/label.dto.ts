import { LabelType } from '.prisma/client'
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class LabelDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	name: string

	@IsNotEmpty()
	@IsEnum(LabelType)
	type: LabelType
}
