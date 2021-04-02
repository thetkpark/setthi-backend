import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsString()
	type: string

	@IsNotEmpty()
	@IsString()
	color: string
}
