import { Saving } from '.prisma/client'
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
		await this.savingService.createSaving(title, target_amount, new Date(start_date), new Date(end_date), userId)
		return this.savingService.getSavings(userId)
	}

	@Patch('saving')
	@UseGuards(JwtAuthGuard)
	async editSaving(
		@Param() params,
		@Body() { title, target_amount }: EditSavingDto,
		@Request() req
	): Promise<Saving[]> {
		const userId = req.user.userId
		const savingId = parseInt(params.id)
		const isOwnSaving = await this.savingService.checkSavingOwnership(userId, savingId)
		if (!isOwnSaving) throw new ForbiddenException()
		await this.savingService.editSaving(savingId, title, target_amount)
		return this.savingService.getSavings(userId)
	}

	@Delete('saving')
	@UseGuards(JwtAuthGuard)
	async deleteSaving(@Param() params, @Request() req): Promise<Saving[]> {
		const userId = req.user.userId
		const savingId = parseInt(params.id)
		const isOwnSaving = await this.savingService.checkSavingOwnership(userId, savingId)
		if (!isOwnSaving) throw new ForbiddenException()
		await this.savingService.deleteSaving(savingId)
		return this.savingService.getSavings(userId)
	}
}
