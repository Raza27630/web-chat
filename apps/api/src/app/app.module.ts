import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [MulterModule.register({
    dest: '/Users/vaishnavkesherwani/web-chat/web-chat/dist/apps/api/avatar'
  })],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService, ChatGateway],
})
export class AppModule { }
