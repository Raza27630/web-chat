import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserId } from '@web-chat/user-info';
import { IMessage } from '@web-chat/api-interfaces';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService) {

    }
    @Get(':chatId')
    async getChatbyId(@Param('chatId') chatId: string) {
        return this.chatService.getChatbyId(chatId)
    }
    @Post()
    async createChatRoom(@Body() members: string[]) {
        return this.chatService.createChatRoom(members);
    }
    @Get('mychat')
    async getMyChat(@UserId() userId: string) {
        return this.chatService.getMyChat(userId);
    }
    @Put(':id')
    async updateChat(@Param('id') chatId: string, @Body() message: IMessage) {
        return this.chatService.updateChat(chatId, message);
    }
}
