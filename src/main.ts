import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as helmet from 'helmet'

async function bootstrap() {
	const port = process.env.PORT || 3000
	const app = await NestFactory.create(AppModule)
	app.use(helmet())
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe({ transform: true }))
	await app.listen(port)
}
bootstrap()
