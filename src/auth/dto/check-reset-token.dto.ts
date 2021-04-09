import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, MaxLength, MinLength } from 'class-validator'

export class CheckResetTokenDto {
	@IsNumberString()
	@MaxLength(6)
	@MinLength(6)
	@ApiProperty()
	token: string
}
