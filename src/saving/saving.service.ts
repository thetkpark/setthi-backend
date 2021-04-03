import { Saving } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SavingService {
	constructor(private prisma: PrismaService) {}

	async getSavings(userId: number): Promise<Saving[]> {
		return this.prisma.saving.findMany({
			where: {
				owner_id: userId,
			},
			orderBy: {
				end_date: 'desc',
			},
		})
	}

	async createSaving(
		title: string,
		target_amount: number,
		start_date: Date,
		end_date: Date,
		ownerId: number
	): Promise<Saving> {
		return this.prisma.saving.create({
			data: {
				title,
				target_amount,
				start_date,
				end_date,
				owner_id: ownerId,
				current_amount: 0,
			},
		})
	}
}
