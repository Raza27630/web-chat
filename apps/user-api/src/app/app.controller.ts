import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@web-chat/api-interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @MessagePattern({ cmd: 'post_User' })
  async postUser(@Payload() userDto: CreateUserDto) {
    return this.appService.createUser(userDto);
  }
  @MessagePattern({ cmd: 'post_UserToGroup' })
  async postUserToGroup(@Payload() payload: { userId: string, memberId: string }) {
    return this.appService.addUserToGroup(payload.userId, payload.memberId);
  }
  @MessagePattern({ cmd: 'get_User' })
  async getUser(@Payload() email: string) {
    return this.appService.getUser(email);
  }
}
