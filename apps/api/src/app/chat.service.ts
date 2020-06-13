import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { IMessage, Conversation } from '@web-chat/api-interfaces';

@Injectable()
export class ChatService {
  private _client: ClientProxy;
  constructor() {
    this._client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000
      }
    });

  }

  getChatbyId(chatId: string) {
    return this._client.send<Conversation>({ cmd: 'get_ChatHistory' }, chatId);
  }

  createChatRoom(members: string[]) {
    return this._client.send<Conversation>({ cmd: 'chat_room' }, members);
  }
  getMyChat(userId: string) {
    return this._client.send<Conversation[]>({ cmd: 'get_PersonalisedChats' }, userId);
  }

  updateChat(chatId: string, message: IMessage) {
    return this._client.emit<Conversation>('update_Chat', { chatId, message });
  }
}
