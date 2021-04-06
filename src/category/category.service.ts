import { Category, CategoryType } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}
	async createCategory(name: string, type: CategoryType, color: string, ownerId: number): Promise<Category> {
		return this.prisma.category.create({
			data: {
				name,
				type,
				color,
				owner_id: ownerId,
			},
		})
	}

	async getCategories(ownerId: number): Promise<Category[]> {
		return this.prisma.category.findMany({
			where: {
				AND: [{ owner_id: ownerId }, { is_deleted: false }],
			},
		})
	}

	async editCategory(categoryId: number, name: string, color: string): Promise<Category> {
		return this.prisma.category.update({
			data: {
				name,
				color,
			},
			where: {
				id: categoryId,
			},
		})
	}

	async deleteCategory(categoryId: number): Promise<Category> {
		return this.prisma.category.update({
			data: {
				is_deleted: true,
			},
			where: {
				id: categoryId,
			},
		})
	}

	async checkCategoryOwnership(ownerId: number, categoryId: number): Promise<boolean> {
		const category = await this.prisma.category.findFirst({
			where: {
				AND: [{ owner_id: ownerId }, { id: categoryId }],
			},
		})
		return category ? true : false
	}

	async checkCategoryOwnershipAndType(ownerId: number, categoryId: number, type: CategoryType): Promise<boolean> {
		const category = await this.prisma.category.findFirst({
			where: {
				AND: [{ owner_id: ownerId }, { id: categoryId }, { type }],
			},
		})
		return category ? true : false
	}

	async countCategories(ownerId: number): Promise<number> {
		return this.prisma.category.count({
			where: {
				AND: [{ owner_id: ownerId }, { is_deleted: false }],
			},
		})
	}
}
