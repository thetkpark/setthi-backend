import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('api/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('signin')
	async login(@Request() req) {
		return this.authService.getToken(req.user)
	}

	@Post('regis')
	async register(@Body() { email, password }: CreateUserDto) {
		const user = await this.authService.regisNewUser(email, password)
		const token = await this.authService.getToken(user)
		return { token }
	}
}
