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

	async getLabels(ownerId: number): Promise<Label[]> {
		return this.prisma.label.findMany({
			where: {
				owner_id: ownerId,
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

	async countLabel(ownerId: number): Promise<number> {
		return this.prisma.label.count({
			where: {
				owner_id: ownerId,
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
}
