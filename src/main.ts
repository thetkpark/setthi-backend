import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const port = process.env.PORT || 3000
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	const config = new DocumentBuilder()
		.setTitle('Setthi Backend API')
		.setDescription('An Swagger API Documentation for Setthi Backend API')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	await app.listen(port)
}
bootstrap()
