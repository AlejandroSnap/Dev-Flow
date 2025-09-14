import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @IsString()
  @MinLength(3, { message: 'Password must be at least 3 characters long.' })
  password: string;
}