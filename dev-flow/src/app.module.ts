import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { BoardModule } from './modules/board/board.module';
import { taskModule } from './modules/task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:pass@localhost:27017/dev-flow?authSource=admin'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    AuthModule,
    UsersModule,
    WorkspaceModule,
    BoardModule,
    taskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
