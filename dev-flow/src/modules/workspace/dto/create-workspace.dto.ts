import { IsBoolean, IsString } from "class-validator";

export class CreateWorkspaceDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly isPublic?: boolean;
}