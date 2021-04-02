import { IsNotEmpty, IsString } from 'class-validator'

export class LabelDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsString()
	type: string
}
