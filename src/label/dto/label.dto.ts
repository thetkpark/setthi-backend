import { LabelType } from '.prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class LabelDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsEnum(LabelType)
	type: LabelType
}
