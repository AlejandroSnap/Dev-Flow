import { Module } from '@nestjs/common';
import { WorkspacesController } from './controller/workspaces.controller';
import { WorkspacesService } from './service/workspaces.service';

@Module({
    controllers: [WorkspacesController],
    providers: [WorkspacesService]
})
export class WorkspaceModule {}