import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { LabelController } from './label.controller'
import { LabelService } from './label.service'

@Module({
	providers: [LabelService, PrismaService],
	exports: [LabelService],
	controllers: [LabelController],
})
export class LabelModule {}
