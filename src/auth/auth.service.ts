import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { User } from '.prisma/client'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.usersService.findByEmail(email)
		if (!user) return null
		const isPasswordMatch = await bcrypt.compare(password, user.password)
		if (!isPasswordMatch) return null
		return user
	}

	async regisNewUser(email: string, password: string) {
		const existingUser = await this.usersService.findByEmail(email)
		if (existingUser) throw new BadRequestException('This email is used')
		return this.usersService.createUser(email, password)
	}

	async getToken(user: User): Promise<string> {
		const payload = {
			sub: user.id,
		}
		return this.jwtService.signAsync(payload)
	}
}
