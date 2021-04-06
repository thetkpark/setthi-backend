import { Saving } from '.prisma/client'
import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common'
import { SavingService } from './saving.service'

@Injectable()
export class SavingValidationPipe implements PipeTransform<string, Promise<Saving>> {
	constructor(private savingService: SavingService) {}
	async transform(id: string) {
		const savingId = parseInt(id)
		const saving = await this.savingService.getSaving(savingId)
		if (!saving) throw new NotFoundException('Saving is not found')
		return saving
	}
}
