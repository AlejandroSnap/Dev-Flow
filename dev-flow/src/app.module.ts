import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { WorkspaceModule } from './workspaces/workspaces.module';

@Module({
  imports: [AuthModule, SharedModule, WorkspaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
