import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './service/users.service';
import { User, UserSchema } from 'src/shared/schemas/user.schema';
import { UsersController } from './controller/users.controller';
import mongoose from 'mongoose';

@Module({
  controllers: [
    UsersController
  ],

  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})

export class UsersModule {}
