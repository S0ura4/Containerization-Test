import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './app/config/environment-config.module';
import { ControllerModule } from './app/controllers/controller.module';
import { SocketIoService } from './services/socket-io/socket-io.adapter';

@Module({
  imports: [EnvironmentConfigModule, ControllerModule],
  controllers: [],
  providers: [SocketIoService],
})
export class AppModule {}
