import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';

class User {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {
constructor(private readonly authRepository: AuthRepository) {}

  login(data: User): string {
    let success: boolean = this.authRepository.findUser(data)
    if (success) {
        return "Bienvenido"
    }

    return "Email o Contraseña invalido."
  }
}
