import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [AuthModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
