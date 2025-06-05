import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './app/config/environment-config.module';
import { ControllerModule } from './app/controllers/controller.module';

@Module({
  imports: [EnvironmentConfigModule, ControllerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
