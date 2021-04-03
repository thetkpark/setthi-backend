import { Saving } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SavingService {
	constructor(private prisma: PrismaService) {}

	async getSavings(userId: number): Promise<Saving[]> {
		return this.prisma.saving.findMany({
			where: {
				AND: [{ owner_id: userId }, { is_finish: false }],
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

	async editSaving(id: number, title: string, target_amount: number): Promise<Saving> {
		return this.prisma.saving.update({
			data: {
				title,
				target_amount,
			},
			where: {
				id,
			},
		})
	}

	async updateCurrentAmount(savingId: number, amount: number): Promise<Saving> {
		// TODO: Handle case when transaction to the finished saving
		const saving = await this.prisma.saving.findFirst({ where: { id: savingId } })
		const savingAmount = saving.current_amount.toNumber() + amount
		const targetAmount = saving.target_amount.toNumber()
		const updateData = {
			current_amount: savingAmount,
			is_finish: false,
		}
		if (savingAmount === targetAmount) updateData.is_finish = true
		return this.prisma.saving.update({
			where: {
				id: savingId,
			},
			data: updateData,
		})
	}

	async deleteSaving(id: number): Promise<Saving> {
		return this.prisma.saving.delete({
			where: {
				id,
			},
		})
	}

	async checkSavingOwnership(ownerId: number, savingId: number): Promise<boolean> {
		const saving = await this.prisma.saving.findFirst({
			where: {
				AND: [{ owner_id: ownerId }, { id: savingId }],
			},
		})
		return saving ? true : false
	}
}
