import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class SavingQueryValidationPipe implements PipeTransform {
	async transform(value: boolean) {
		if (!value) return undefined
		return value
	}
}
