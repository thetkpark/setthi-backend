import { Category, CategoryType } from '.prisma/client'
import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'

@Controller('api')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Post('category')
	@UseGuards(JwtAuthGuard)
	async createCategory(@Body() { name, type, color }: CategoryDto, @Request() req): Promise<Category[]> {
		const userId = req.user.userId
		const categoryType = await this.categoryService.getCategoryType(type)
		await this.categoryService.createCategory(name, categoryType, color, userId)
		return this.categoryService.getCategories(userId)
	}

	@Get('categories')
	@UseGuards(JwtAuthGuard)
	async getCategories(@Request() req): Promise<Category[]> {
		const userId = req.user.userId
		return this.categoryService.getCategories(userId)
	}

	@Patch('category/:id')
	@UseGuards(JwtAuthGuard)
	async editCategory(
		@Param() params,
		@Body() { name, type, color }: CategoryDto,
		@Request() req
	): Promise<Category[]> {
		const userId = req.user.userId
		const categoryId = parseInt(params.id)
		const isOwnCategory = await this.categoryService.checkCategoryOwnership(userId, categoryId)
		if (!isOwnCategory) throw new ForbiddenException()
		const categoryType: CategoryType = await this.categoryService.getCategoryType(type)
		await this.categoryService.editCategory(categoryId, name, categoryType, color)
		return this.categoryService.getCategories(userId)
	}

	@Delete('category/:id')
	@UseGuards(JwtAuthGuard)
	async deleteCategory(@Param() params, @Request() req): Promise<Category[]> {
		const userId = req.user.userId
		const categoryId = parseInt(params.id)
		const isOwnCategory = await this.categoryService.checkCategoryOwnership(userId, categoryId)
		if (!isOwnCategory) throw new ForbiddenException()
		await this.categoryService.deleteCategory(categoryId)
		return this.categoryService.getCategories(userId)
	}
}
