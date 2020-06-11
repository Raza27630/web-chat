import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { IMessage } from '@web-chat/api-interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @MessagePattern({ cmd: 'get_ChatHistory' })
  async getChatHistory(@Payload() chatId: string) {
    return this.appService.getChatHistory(chatId);
  }
  @MessagePattern({ cmd: 'get_PersonalisedChats' })
  async getAllChatHistory(@Payload() user: string) {
    return this.appService.getAllChatHistory(user);
  }
  @MessagePattern({ cmd: 'chat_room' })
  async createChatRoom(@Payload() members: string[]) {
    return this.appService.createChatRoom(members);
  }
  @EventPattern('update_Chat')
  async updatePersonalisedChat(@Payload() data: { chatId: string, message: IMessage }, ) {
    return this.appService.updateChat(data.message, data.chatId);
  }
}
