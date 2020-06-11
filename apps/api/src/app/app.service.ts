import { Injectable } from '@nestjs/common';
import {  CreateUserDto, UserGroup, User } from '@web-chat/api-interfaces';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private _client: ClientProxy;
  constructor() {
    this._client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3000
      }
    });

  }
  postUser(payload: CreateUserDto) {
    return this._client.send<CreateUserDto>({ cmd: 'post_User' }, payload);
  }
  postUserToGroup(memberId: string, userId: string) {
    return this._client.send<UserGroup>({ cmd: 'post_UserToGroup' }, {
      userId,
      memberId
    });
  }
  getUser(email: string) {
    return this._client.send<User>({ cmd: 'get_User' }, email);
  }
  getAllUser(userId:string){
    return this._client.send<User[]>({ cmd: 'get_AllUser' },userId);
  }
}
