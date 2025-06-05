import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SocketIoService } from './services/socket-io/socket-io.adapter';
import { createServer } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const httpServer = createServer(app.getHttpAdapter().getInstance());
  const socketIoService = app.get(SocketIoService);
  socketIoService.initSocketIo(httpServer);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.setGlobalPrefix('api');
  await app.init(); // important when using custom server

  // Start listening manually
  httpServer.listen(port, () => {
    Logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
  });
}
bootstrap();
