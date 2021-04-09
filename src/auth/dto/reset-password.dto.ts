import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator'

export class ResetPasswordDto {
	@IsNotEmpty()
	@IsNumberString()
	@MaxLength(6)
	@MinLength(6)
	@ApiProperty()
	token: string

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	password: string
}
