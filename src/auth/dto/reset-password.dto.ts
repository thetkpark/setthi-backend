import { IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator'

export class ResetPasswordDto {
	@IsNotEmpty()
	@IsNumberString()
	@MaxLength(6)
	@MinLength(6)
	token: string

	@IsNotEmpty()
	@IsString()
	password: string
}
