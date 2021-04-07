import { Saving } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SavingService {
	constructor(private prisma: PrismaService) {}

	async getSavings(userId: number, is_finish?: boolean, is_used?: boolean) {
		if (is_finish === undefined && is_used === undefined) {
			const ops: Promise<Saving[]>[] = [
				this.prisma.saving.findMany({
					where: {
						AND: [{ owner_id: userId }, { is_finish: false }],
					},
				}),
				this.prisma.saving.findMany({
					where: {
						AND: [
							{ owner_id: userId },
							{ is_finish: true },
							{
								current_amount: {
									not: 0,
								},
							},
						],
					},
				}),
				this.prisma.saving.findMany({
					where: {
						AND: [
							{ owner_id: userId },
							{ is_finish: true },
							{
								current_amount: 0,
							},
						],
					},
				}),
			]
			const result = await Promise.all(ops)
			return {
				un_finished: result[0],
				finished_unused: result[1],
				finished_used: result[2],
			}
		}
		return this.prisma.saving.findMany({
			where: {
				AND: [
					{ owner_id: userId },
					{ is_finish },
					{
						current_amount: is_used ? 0 : { not: 0 },
					},
				],
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

	async addCurrentAmount(savingId: number, amount: number): Promise<Saving> {
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

	async resetCurrentAmount(savingId: number): Promise<Saving> {
		return this.prisma.saving.update({
			where: {
				id: savingId,
			},
			data: {
				current_amount: 0,
			},
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

	async countSaving(ownerId: number): Promise<number> {
		const count = await this.prisma.saving.count({
			where: {
				AND: [{ owner_id: ownerId }, { is_finish: false }],
			},
		})
		return count
	}

	async getSaving(savingId: number): Promise<Saving> {
		return await this.prisma.saving.findFirst({
			where: {
				id: savingId,
			},
		})
	}

	async checkSavingOwnershipAndNotFinish(ownerId: number, savingId: number): Promise<boolean> {
		const saving = await this.prisma.saving.findFirst({
			where: {
				AND: [{ owner_id: ownerId }, { id: savingId }, { is_finish: false }],
			},
		})
		return saving ? true : false
	}

	async checkSavingOwnershipAndFinish(ownerId: number, savingId: number): Promise<boolean> {
		const saving = await this.prisma.saving.findFirst({
			where: {
				AND: [
					{ owner_id: ownerId },
					{ id: savingId },
					{ is_finish: true },
					{
						current_amount: {
							not: 0,
						},
					},
				],
			},
		})
		return saving ? true : false
	}

	async getFinishedUnusedSaving(ownerId: number): Promise<Saving[]> {
		return this.prisma.saving.findMany({
			where: {
				AND: [
					{ owner_id: ownerId },
					{ is_finish: true },
					{
						current_amount: {
							not: 0,
						},
					},
				],
			},
		})
	}
}
