import {
	Controller,
	Request,
	Post,
	UseGuards,
	Body,
	BadRequestException,
	NotFoundException,
	InternalServerErrorException,
	HttpCode,
	Patch,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { RequestResetPasswordDto } from './dto/request-reset-password.dto'
import { LocalAuthGuard } from './local-auth.guard'
import { generateResetToken } from '../utils/nanoid'
import { CheckResetTokenDto } from './dto/check-reset-token.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { LabelService } from 'src/label/label.service'
import { CategoryService } from 'src/category/category.service'
import { WalletService } from 'src/wallet/wallet.service'

@Controller('api/auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private labelService: LabelService,
		private categoryService: CategoryService,
		private walletService: WalletService
	) {}

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
		await Promise.all([
			this.labelService.initLabels(user.id),
			this.categoryService.initCategories(user.id),
			this.walletService.initWallet(user.id),
		])
		const token = await this.authService.getToken(user)
		return { token }
	}

	@Post('reset')
	async requestResetPassword(@Body() { email }: RequestResetPasswordDto) {
		const user = await this.authService.findByEmail(email)
		if (!user) throw new NotFoundException('Account is not found')
		const token = generateResetToken()
		const sent = await this.authService.sendResetPasswordEmail(user, token)
		if (!sent) throw new InternalServerErrorException('Email sending is not success')
	}

	@Post('check-token')
	@HttpCode(200)
	async checkTokenValidity(@Body() { token }: CheckResetTokenDto) {
		this.authService.checkResetToken(token)
		return { token_validity: true }
	}

	@Patch('reset')
	async resetPassword(@Body() { token, password }: ResetPasswordDto) {
		return this.authService.changePassword(token, password)
	}
}
