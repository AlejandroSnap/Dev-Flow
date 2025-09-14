import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkspaceService } from './service/workspace.service';
import { WorkspaceController } from './controller/workspace.controller';

import { Workspace, WorkspaceSchema } from 'src/shared/schemas/workspace.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Workspace.name, schema: WorkspaceSchema }]), UsersModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService]
})

export class WorkspaceModule {}