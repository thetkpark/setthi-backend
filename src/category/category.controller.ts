import { Category } from '.prisma/client'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from 'src/decorators/user.decorator'
import { CategoryValidationPipe } from './category-validation.pipe'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'
import { EditCategoryDto } from './dto/edit-category.dto'
import { QueryCategoryDto } from './dto/query-category.dto'

@Controller('api')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Post('category')
	@UseGuards(JwtAuthGuard)
	async createCategory(@Body() { name, type, color }: CategoryDto, @User() userId: number): Promise<Category[]> {
		const categoriesCount = await this.categoryService.countCategories(userId)
		if (categoriesCount === 10) throw new BadRequestException('Limit number of categories exceeded')
		await this.categoryService.createCategory(name, type, color, userId)
		return this.categoryService.getCategories(userId)
	}

	@Get('categories')
	@UseGuards(JwtAuthGuard)
	async getCategories(@Query() query: QueryCategoryDto, @User() userId: number): Promise<Category[]> {
		return this.categoryService.getCategories(userId, query.type)
	}

	@Patch('category/:id')
	@UseGuards(JwtAuthGuard)
	async editCategory(
		@Param('id', CategoryValidationPipe) category: Category,
		@Body() { name, color }: EditCategoryDto,
		@User() userId: number
	): Promise<Category[]> {
		const isOwnCategory = await this.categoryService.checkCategoryOwnership(userId, category.id)
		if (!isOwnCategory) throw new ForbiddenException()
		await this.categoryService.editCategory(category.id, name, color)
		return this.categoryService.getCategories(userId)
	}

	@Delete('category/:id')
	@UseGuards(JwtAuthGuard)
	async deleteCategory(
		@Param('id', CategoryValidationPipe) category: Category,
		@User() userId: number
	): Promise<Category[]> {
		const isOwnCategory = await this.categoryService.checkCategoryOwnership(userId, category.id)
		if (!isOwnCategory) throw new ForbiddenException()
		await this.categoryService.deleteCategory(category.id)
		return this.categoryService.getCategories(userId)
	}
}
