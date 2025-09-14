import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/modules/users/service/users.service';

import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
// import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('user not found');

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new UnauthorizedException('Incorrect password');

    return user;
  }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        const payload = { sub: user._id.toString(), email: user.email };
        return { access_token: this.jwtService.sign(payload)};
    }
}