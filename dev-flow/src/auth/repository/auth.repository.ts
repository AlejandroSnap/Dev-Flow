import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  async validateUserPassword(email: string, password: string) {
    return users.find((user) => user.email === email && user.password === password);
  }
}