import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from 'src/shared/schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
  async create(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10)
    const newUser = new this.userModel({ ...dto, password: hashed });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
