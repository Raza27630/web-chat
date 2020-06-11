import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IMessage } from '@web-chat/api-interfaces';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() wss: Server;
  @SubscribeMessage('joinChat')
  handleRoomJoining(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', `${room}   joined`)
  }
  @SubscribeMessage('leaveChat')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
  }
  @SubscribeMessage('pingToServer')
  handleChat(client: Socket, data: { room: string, message: IMessage }) {
    this.wss.to(data.room).emit('msgToClients', data.message);
  }
  emitHttpMsgToClients(room: string, message: IMessage) {
    this.wss.to(room).emit('msgToClients', message);
  }
}
