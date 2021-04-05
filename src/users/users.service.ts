import { User } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findById(userId: number): Promise<User> {
		return this.prisma.user.findFirst({ where: { id: userId } })
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.prisma.user.findFirst({ where: { email } })
		return user
	}

	async createUser(email: string, password: string): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await this.prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		})
		return user
	}

	async updatePassword(userId: number, password: string): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10)
		return this.prisma.user.update({
			data: {
				password: hashedPassword,
			},
			where: {
				id: userId,
			},
		})
	}
}
