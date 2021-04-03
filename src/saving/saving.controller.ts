import { Saving } from '.prisma/client'
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateSavingDto } from './dto/create-saving.dto'
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
}
