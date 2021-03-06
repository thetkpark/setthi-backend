import { Label, LabelType } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class LabelService {
	constructor(private prisma: PrismaService) {}
	async createLabel(label: string, type: LabelType, ownerId: number): Promise<Label> {
		return this.prisma.label.create({
			data: {
				label,
				type,
				owner_id: ownerId,
			},
		})
	}

	async getLabels(ownerId: number, type?: LabelType): Promise<Label[]> {
		return this.prisma.label.findMany({
			where: {
				AND: [{ owner_id: ownerId }, { type }],
			},
		})
	}

	async editLabel(labelId: number, label: string, type: LabelType): Promise<Label> {
		return this.prisma.label.update({
			data: {
				label,
				type,
			},
			where: {
				id: labelId,
			},
		})
	}

	async deleteLabel(labelId: number): Promise<Label> {
		return this.prisma.label.delete({
			where: {
				id: labelId,
			},
		})
	}

	async checkLabelOwnership(ownerId: number, labelId: number): Promise<boolean> {
		const label = await this.prisma.label.findFirst({
			where: {
				AND: [{ owner_id: ownerId }, { id: labelId }],
			},
		})
		return label ? true : false
	}

	async countLabel(ownerId: number, type?: LabelType): Promise<number> {
		return this.prisma.label.count({
			where: {
				AND: [{ owner_id: ownerId }, { type }],
			},
		})
	}

	async getLabel(labelId: number): Promise<Label> {
		return this.prisma.label.findFirst({
			where: {
				id: labelId,
			},
		})
	}

	async initLabels(owner_id: number) {
		return this.prisma.label.createMany({
			data: [
				{ label: 'Salary', type: LabelType.INCOME, owner_id },
				{ label: 'Bonus', type: LabelType.INCOME, owner_id },
				{ label: 'Gift', type: LabelType.INCOME, owner_id },
				{ label: 'Taxi', type: LabelType.EXPENSE, owner_id },
				{ label: 'Lunch', type: LabelType.EXPENSE, owner_id },
				{ label: 'Hangout', type: LabelType.EXPENSE, owner_id },
			],
		})
	}
}
