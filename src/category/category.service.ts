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
				owner_id: ownerId,
			},
		})
	}

	async editCategory(categoryId: number, name: string, type: CategoryType, color: string): Promise<Category> {
		return this.prisma.category.update({
			data: {
				name,
				type,
				color,
			},
			where: {
				id: categoryId,
			},
		})
	}

	async deleteCategory(categoryId: number): Promise<Category> {
		return this.prisma.category.delete({
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

	async getCategoryType(type: string): Promise<CategoryType> {
		switch (type) {
			case 'Income':
				return CategoryType.INCOME
			case 'Expense':
				return CategoryType.EXPENSE
		}
	}
}
