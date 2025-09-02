import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../entity/users.entity';

@Injectable()
export class AuthRepository {
    
    async validateUserPassword(email: string, password: string) : Promise<UsersEntity | undefined> {
        let response = users.filter((user) => user.email == email && user.password == password);
        return (response) ? response.at(0) : undefined;
    }

}