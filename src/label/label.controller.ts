import { Label } from '.prisma/client'
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
import { LabelDto } from './dto/label.dto'
import { LabelValidationPipe } from './label-validation.pipe'
import { LabelService } from './label.service'
import { User } from 'src/decorators/user.decorator'
import { QueryLabelDto } from './dto/query-label.dto'

@Controller('api')
export class LabelController {
	constructor(private labelService: LabelService) {}

	@Post('label')
	@UseGuards(JwtAuthGuard)
	async createLabel(@Body() { name, type }: LabelDto, @User() userId: number): Promise<Label[]> {
		const labelCount = await this.labelService.countLabel(userId, type)
		if (labelCount === 10) throw new BadRequestException(`Limit number of ${type} label exceeded`)
		await this.labelService.createLabel(name, type, userId)
		return this.labelService.getLabels(userId)
	}

	@Get('labels')
	@UseGuards(JwtAuthGuard)
	async getLabels(@Query() labelQuery: QueryLabelDto, @User() userId: number): Promise<Label[]> {
		return this.labelService.getLabels(userId, labelQuery.type)
	}

	@Patch('label/:id')
	@UseGuards(JwtAuthGuard)
	async editLabel(
		@Param('id', LabelValidationPipe) label: Label,
		@Body() { name, type }: LabelDto,
		@User() userId: number
	): Promise<Label[]> {
		const isOwnLabel = userId === label.owner_id
		if (!isOwnLabel) throw new ForbiddenException()
		await this.labelService.editLabel(label.id, name, type)
		return this.labelService.getLabels(userId)
	}

	@Delete('label/:id')
	@UseGuards(JwtAuthGuard)
	async deleteLabel(@Param('id', LabelValidationPipe) label: Label, @User() userId: number): Promise<Label[]> {
		const isOwnLabel = await this.labelService.checkLabelOwnership(userId, label.id)
		if (!isOwnLabel) throw new ForbiddenException()
		const numberOfLabel = await this.labelService.countLabel(userId, label.type)
		if (numberOfLabel === 1) throw new BadRequestException('Cannot delete last label')
		await this.labelService.deleteLabel(label.id)
		return this.labelService.getLabels(userId)
	}
}
