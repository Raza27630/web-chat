/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions,Transport } from '@nestjs/microservices'

import { AppModule } from './app/app.module';


const logger = new Logger('main');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000,
        retryAttempts: 3,
        retryDelay: 100
      }
    }
  );
  app.listen(() => logger.log('Chat-Histroy Microservice is listening'));
}

bootstrap();
