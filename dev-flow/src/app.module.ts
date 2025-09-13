import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { WorkspaceModule } from './workspaces/workspaces.module';
import { BoardModule } from './board/board.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, SharedModule, 
    WorkspaceModule, BoardModule /*MongooseModule.forRoot(url de la base de datos) */
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
