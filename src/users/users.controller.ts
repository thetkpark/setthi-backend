import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { User } from 'src/decorators/user.decorator'

@Controller('api/user')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getUser(@User() userId: number) {
		return this.usersService.findById(userId)
	}
}
