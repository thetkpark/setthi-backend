import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import isISO8601 from 'validator/lib/isISO8601'

dayjs.extend(utc)

@Injectable()
export class DateValidationPipe implements PipeTransform {
	transform(value: any) {
		if (!value) {
			return {
				startDate: dayjs().utc().startOf('month').toDate(),
				endDate: dayjs().utc().endOf('month').toDate(),
			}
		}
		if (!isISO8601(value)) throw new BadRequestException('Date query must be an ISO8601 date string')
		return {
			startDate: dayjs(value).utc().startOf('month').toDate(),
			endDate: dayjs(value).utc().endOf('month').toDate(),
		}
	}
}
