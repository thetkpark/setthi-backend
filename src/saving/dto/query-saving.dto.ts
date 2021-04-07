import { IsBooleanString, IsOptional } from 'class-validator'

export class QuerySavingDto {
	@IsOptional()
	@IsBooleanString()
	is_finished?: string

	@IsOptional()
	@IsBooleanString()
	is_used?: string
}
