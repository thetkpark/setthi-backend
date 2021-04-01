import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	getPing(): any {
		return {
			message: 'pong',
			timestamp: Date.now(),
		}
	}
}
