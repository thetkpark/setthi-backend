import { Label, LabelType } from '.prisma/client'
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
import { LabelDto } from './dto/label.dto'
import { LabelService } from './label.service'

@Controller('api')
export class LabelController {
	constructor(private labelService: LabelService) {}

	@Post('label')
	@UseGuards(JwtAuthGuard)
	async createLabel(@Body() { name, type }: LabelDto, @Request() req): Promise<Label[]> {
		const userId = req.user.userId
		await this.labelService.createLabel(name, type, userId)
		return this.labelService.getLabels(userId)
	}

	@Get('labels')
	@UseGuards(JwtAuthGuard)
	async getLabels(@Request() req): Promise<Label[]> {
		const userId = req.user.userId
		return this.labelService.getLabels(userId)
	}

	@Patch('label/:id')
	@UseGuards(JwtAuthGuard)
	async editLabel(@Param() params, @Body() { name, type }: LabelDto, @Request() req): Promise<Label[]> {
		const userId = req.user.userId
		const labelId = parseInt(params.id)
		const isOwnLabel = await this.labelService.checkLabelOwnership(userId, labelId)
		if (!isOwnLabel) throw new ForbiddenException()
		await this.labelService.editLabel(labelId, name, type)
		return this.labelService.getLabels(userId)
	}

	@Delete('label/:id')
	@UseGuards(JwtAuthGuard)
	async deleteLabel(@Param() params, @Request() req): Promise<Label[]> {
		const userId = req.user.userId
		const labelId = parseInt(params.id)
		const isOwnLabel = await this.labelService.checkLabelOwnership(userId, labelId)
		if (!isOwnLabel) throw new ForbiddenException()
		await this.labelService.deleteLabel(labelId)
		return this.labelService.getLabels(userId)
	}
}
