import {
	Controller,
	Request,
	Post,
	UseGuards,
	Body,
	BadRequestException,
	NotFoundException,
	InternalServerErrorException,
	Get,
	HttpCode,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { LocalAuthGuard } from './local-auth.guard'
import { generateResetToken } from '../utils/nanoid'
import { CheckResetTokenDto } from './dto/check-reset-token.dto'

@Controller('api/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('signin')
	async login(@Request() req) {
		const token = await this.authService.getToken(req.user)
		return { token }
	}

	@Post('regis')
	async register(@Body() { email, password }: CreateUserDto) {
		if (!email) throw new BadRequestException('Email is required')
		if (!password) throw new BadRequestException('Password is required')
		const user = await this.authService.regisNewUser(email, password)
		const token = await this.authService.getToken(user)
		return { token }
	}

	@Post('reset')
	async resetPassword(@Body() { email }: ResetPasswordDto) {
		const user = await this.authService.findByEmail(email)
		if (!user) throw new NotFoundException('Account is not found')
		const token = generateResetToken()
		const sent = await this.authService.sendResetPasswordEmail(user, token)
		if (!sent) throw new InternalServerErrorException('Email sending is not success')
	}

	@Post('check-token')
	@HttpCode(200)
	async checkTokenValidity(@Body() { token }: CheckResetTokenDto) {
		const valid = this.authService.checkResetToken(token)
		if (!valid) throw new BadRequestException('Token is expried or invalid')
		return { token_validity: true }
	}
}
