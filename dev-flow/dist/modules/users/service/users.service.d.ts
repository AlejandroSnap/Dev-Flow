import { Model } from 'mongoose';
import { User, UserDocument } from 'src/shared/schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(dto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User>;
}
