import { Body, Controller, Post } from '@nestjs/common';
import { RequestLogin } from '../dto/auth.request.dto';
import { ResponseLogin } from '../dto/auth.response.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() payload: RequestLogin): Promise<ResponseLogin> {
        return await this.authService.login(payload);
    }


    @Post("signup")
    async signup(): Promise<string> {
        return "registered";
    }
}