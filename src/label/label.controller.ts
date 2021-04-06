import { Label } from '.prisma/client'
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
import { LabelDto } from './dto/label.dto'
import { LabelValidationPipe } from './label-validation.pipe'
import { LabelService } from './label.service'

@Controller('api')
export class LabelController {
	constructor(private labelService: LabelService) {}

	@Post('label')
	@UseGuards(JwtAuthGuard)
	async createLabel(@Body() { name, type }: LabelDto, @Request() req): Promise<Label[]> {
		const userId = req.user.userId
		const labelCount = await this.labelService.countLabel(userId)
		if (labelCount === 10) throw new BadRequestException('Limit number of label exceeded')
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
	async editLabel(
		@Param('id', LabelValidationPipe) label: Label,
		@Body() { name, type }: LabelDto,
		@Request() req
	): Promise<Label[]> {
		const userId: number = req.user.userId
		const isOwnLabel = userId === label.owner_id
		if (!isOwnLabel) throw new ForbiddenException()
		await this.labelService.editLabel(label.id, name, type)
		return this.labelService.getLabels(userId)
	}

	@Delete('label/:id')
	@UseGuards(JwtAuthGuard)
	async deleteLabel(@Param('id', LabelValidationPipe) label: Label, @Request() req): Promise<Label[]> {
		const userId = req.user.userId
		const isOwnLabel = await this.labelService.checkLabelOwnership(userId, label.id)
		if (!isOwnLabel) throw new ForbiddenException()
		await this.labelService.deleteLabel(label.id)
		return this.labelService.getLabels(userId)
	}
}
