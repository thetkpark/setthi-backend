import { Category } from '.prisma/client'
import { Injectable, PipeTransform, ArgumentMetadata, NotFoundException } from '@nestjs/common'
import { CategoryService } from './category.service'

@Injectable()
export class CategoryValidationPipe implements PipeTransform<string, Promise<Category>> {
	constructor(private categoryService: CategoryService) {}
	async transform(id: string) {
		const categoryId = parseInt(id)
		const category = await this.categoryService.getCategory(categoryId)
		if (!category) throw new NotFoundException('Category is not found')
		return category
	}
}
