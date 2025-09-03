import { IsMongoId, IsNumber, Min, Max } from 'class-validator';

export class AddMemberDto {
  @IsMongoId()
  userId: string;

  @IsNumber()
  @Min(0)
  @Max(3)
  role: number;
}
