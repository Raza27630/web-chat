import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { CreateUserDto } from '@web-chat/api-interfaces';
import { UserId } from '@web-chat/user-info';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('user')
  postUser(@Body() userDto: CreateUserDto) {
    return this.appService.postUser(userDto);
  }
  @Post('addUserToGroup/:id')
  postUserToGroup(@Param('id') memberId: string, @UserId() userId: string) {
    return this.appService.postUserToGroup(memberId, userId);
  }
  @Get('user')
  getUser(@Query('email') email: string) {
    return this.appService.getUser(email);
  }
  @Get('alluser')
  getAlluser(@UserId() userId: string) {
    return this.appService.getAllUser(userId);
  }
}
