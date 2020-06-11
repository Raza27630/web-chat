import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService, ChatGateway],
})
export class AppModule { }
