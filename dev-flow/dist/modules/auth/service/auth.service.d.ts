import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/service/users.service';
import { LoginDto } from '../dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../../../shared/schemas/user.schema").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
