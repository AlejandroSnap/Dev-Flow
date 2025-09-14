import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<import("../../../shared/schemas/user.schema").User>;
    getProfile(req: any): any;
}
