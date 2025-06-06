import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './app/config/environment-config.module';
import { ControllerModule } from './app/controllers/controller.module';
import { SocketIoService } from './services/socket-io/socket-io.adapter';
import { DataServicesModule } from './services/data-services/data-services.module';

@Module({
  imports: [EnvironmentConfigModule, ControllerModule, DataServicesModule],
  controllers: [],
  providers: [SocketIoService],
})
export class AppModule {}
