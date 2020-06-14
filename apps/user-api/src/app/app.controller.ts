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
  @MessagePattern({ cmd: 'get_AllUser' })
  async getAllUser(@Payload() userId: string) {
    return this.appService.getAllUsers(userId);
  }
  @MessagePattern({ cmd: 'search_User' })
  async searchUser(@Payload() data: { userId: string, searchText: string }) {
    return this.appService.getFilteredUser(data.userId, data.searchText);
  }
  @MessagePattern({ cmd: 'get_UserGroup' })
  async getUserGroup(@Payload() userId: string,) {
    return this.appService.getUserGroup(userId);
  }
  @MessagePattern({ cmd: 'update_Avatar' })
  async updateAvatar(@Payload() data: { userId: string, avatar: string }) {
    return this.appService.updateUserAvatar(data.userId, data.avatar);
  }
}
