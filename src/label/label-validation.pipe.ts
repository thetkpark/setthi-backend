import { Label } from '.prisma/client'
import { Injectable, PipeTransform, ArgumentMetadata, NotFoundException } from '@nestjs/common'
import { LabelService } from './label.service'

@Injectable()
export class LabelValidationPipe implements PipeTransform<string, Promise<Label>> {
	constructor(private labelService: LabelService) {}
	async transform(id: string) {
		const labelId = parseInt(id)
		const label = await this.labelService.getLabel(labelId)
		if (!label) throw new NotFoundException('Label is not found')
		return label
	}
}
