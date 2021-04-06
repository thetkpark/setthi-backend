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
	Request,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'
import { EditCategoryDto } from './dto/edit-category.dto'

@Controller('api')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Post('category')
	@UseGuards(JwtAuthGuard)
	async createCategory(@Body() { name, type, color }: CategoryDto, @Request() req): Promise<Category[]> {
		const userId = req.user.userId
		const categoriesCount = await this.categoryService.countCategories(userId)
		if (categoriesCount === 10) throw new BadRequestException('Limit number of categories exceeded')
		await this.categoryService.createCategory(name, type, color, userId)
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
	async editCategory(@Param() params, @Body() { name, color }: EditCategoryDto, @Request() req): Promise<Category[]> {
		const userId = req.user.userId
		const categoryId = parseInt(params.id)
		const isOwnCategory = await this.categoryService.checkCategoryOwnership(userId, categoryId)
		if (!isOwnCategory) throw new ForbiddenException()
		await this.categoryService.editCategory(categoryId, name, color)
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
