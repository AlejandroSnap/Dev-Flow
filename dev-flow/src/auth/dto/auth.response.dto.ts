import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResponseLogin {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}