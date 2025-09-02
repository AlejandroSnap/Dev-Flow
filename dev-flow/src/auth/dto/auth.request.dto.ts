import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RequestLogin {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}