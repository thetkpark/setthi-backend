import { Saving } from '.prisma/client'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateSavingDto } from './dto/create-saving.dto'
import { EditSavingDto } from './dto/edit-saving.dto'
import { SavingService } from './saving.service'

@Controller('api')
export class SavingController {
	constructor(private savingService: SavingService) {}

	@Get('savings')
	@UseGuards(JwtAuthGuard)
	async getSavings(@Request() req): Promise<Saving[]> {
		const userId = req.user.userId
		return this.savingService.getSavings(userId)
	}

	@Post('saving')
	@UseGuards(JwtAuthGuard)
	async createSaving(
		@Body() { title, target_amount, start_date, end_date }: CreateSavingDto,
		@Request() req
	): Promise<Saving[]> {
		const userId = req.user.userId
		const savingCount = await this.savingService.countSaving(userId)
		if (savingCount === 5) throw new BadRequestException('Limit number of saving exceeded')
		await this.savingService.createSaving(title, target_amount, new Date(start_date), new Date(end_date), userId)
		return this.savingService.getSavings(userId)
	}

	@Patch('saving/:id')
	@UseGuards(JwtAuthGuard)
	async editSaving(
		@Param('id', ParseIntPipe) savingId: number,
		@Body() { title, target_amount }: EditSavingDto,
		@Request() req
	): Promise<Saving[]> {
		const userId = req.user.userId
		const isOwnSaving = await this.savingService.checkSavingOwnership(userId, savingId)
		if (!isOwnSaving) throw new ForbiddenException()
		await this.savingService.editSaving(savingId, title, target_amount)
		return this.savingService.getSavings(userId)
	}

	@Delete('saving/:id')
	@UseGuards(JwtAuthGuard)
	async deleteSaving(@Param('id', ParseIntPipe) savingId: number, @Request() req): Promise<Saving[]> {
		const userId = req.user.userId
		const isOwnSaving = await this.savingService.checkSavingOwnership(userId, savingId)
		if (!isOwnSaving) throw new ForbiddenException()
		await this.savingService.deleteSaving(savingId)
		return this.savingService.getSavings(userId)
	}
}
