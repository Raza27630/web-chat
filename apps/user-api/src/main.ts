import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3000,
        retryAttempts: 3,
        retryDelay: 100
      }
    }
  );
  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();
