import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from 'src/modules/users/service/users.service';
import { UsersController } from 'src/modules/users/controller/users.controller';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}