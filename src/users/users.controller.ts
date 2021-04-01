import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from './users.service'

@Controller('user')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getUser(@Request() req) {
		return this.usersService.findById(req.user.userId)
	}
}
