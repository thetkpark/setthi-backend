import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class RequestResetPasswordDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	email: string
}
