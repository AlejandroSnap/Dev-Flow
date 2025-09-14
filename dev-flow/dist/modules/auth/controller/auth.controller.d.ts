import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
