import { IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  addColumn?: string;

  @IsOptional()
  @IsString()
  removeColumn?: string;
}
