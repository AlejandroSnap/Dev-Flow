import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./../service/auth.service"

class User {
    username: string;
    password: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post("login")
  login(@Body() body : User) {
    return this.authService.login(body)
  }
}