import { Injectable } from '@nestjs/common';

class User {
    username: string;
    password: string
}

@Injectable()
export class AuthRepository { 'Logica de acceso de datos'
private users = [
    {
        username : "user",
        password: "admin1234",
    }
];

  findUser(user: User): boolean {
    for (const [_, data] of Object.entries(this.users)) {
        if (data.username == user.username) {
            return data.password == user.password
        }
    }
    return false
  }
}