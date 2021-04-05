import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { User } from '.prisma/client'
import { JwtService } from '@nestjs/jwt'
import { MailgunService } from '@nextnm/nestjs-mailgun'
import { nodeCache } from '../utils/node-cache'
import { getMailTemplate } from '../utils/mail-template'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private mailgunService: MailgunService
	) {}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.findByEmail(email)
		if (!user) return null
		const isPasswordMatch = await bcrypt.compare(password, user.password)
		if (!isPasswordMatch) return null
		return user
	}

	async regisNewUser(email: string, password: string): Promise<User> {
		const existingUser = await this.findByEmail(email)
		if (existingUser) throw new BadRequestException('This email is used')
		return this.usersService.createUser(email, password)
	}

	async getToken(user: User): Promise<string> {
		const payload = {
			sub: user.id,
		}
		return this.jwtService.signAsync(payload)
	}

	async findByEmail(email: string): Promise<User> {
		return this.usersService.findByEmail(email)
	}

	async sendResetPasswordEmail(user: User, token: string): Promise<boolean> {
		nodeCache.set(token, user.id)
		return this.mailgunService.sendEmail({
			from: 'no-reply@setthi.cscms.me',
			to: user.email,
			subject: 'Setthi: Reset your password',
			html: getMailTemplate(token),
		})
	}

	checkResetToken(token: string): number {
		const userId = nodeCache.get<string>(token)
		if (!userId) throw new BadRequestException('Token is expried or invalid')
		return parseInt(userId)
	}

	async changePassword(userId: number, password: string): Promise<User> {
		return this.usersService.updatePassword(userId, password)
	}
}
