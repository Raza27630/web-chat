import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { Message, CreateUserDto } from '@web-chat/api-interfaces';
import { UserId } from '@web-chat/user-info';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
  @Post('user')
  postUser(@Body() userDto: CreateUserDto) {
    return this.appService.postUser(userDto);
  }
  @Post('addUserToGroup/:id')
  postUserToGroup(@Param('id') memberId: string, @UserId() userId: string) {
    return this.appService.postUserToGroup(memberId, userId);
  }
  @Get('user')
  getUser(@Query('email') email:string) {
    return this.appService.getUser(email);
  }
}
