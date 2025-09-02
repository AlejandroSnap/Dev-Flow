import { Injectable } from '@nestjs/common';
import { RequestLogin } from '../dto/auth.request.dto';
import { AuthRepository } from '../repository/auth.repository';
import { ResponseLogin } from '../dto/auth.response.dto';

@Injectable()
export class AuthService {

    constructor (private readonly authRepository: AuthRepository) {}

    async login(loginCredentials: RequestLogin) : Promise<ResponseLogin> {

        const userInfo = await this.authRepository.validateUserPassword(loginCredentials.email, loginCredentials.password);
        const response = { 
            message: (userInfo) ? userInfo.name : "Bad credentials"
        }
        return response;
    }
}