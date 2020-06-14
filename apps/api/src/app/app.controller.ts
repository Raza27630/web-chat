import { Controller, Get, Post, Body, Param, Query, UseInterceptors, HttpCode, Put, UploadedFile, Req, Res } from '@nestjs/common';

import { CreateUserDto } from '@web-chat/api-interfaces';
import { UserId } from '@web-chat/user-info';

import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @Get('searchUser')
  searchUsers(@UserId() userId: string, @Query('text') searchText: string) {
    return this.appService.searchUsers(userId, searchText);
  }
  @Get('userGroup')
  getUserGroup(@UserId() userId: string) {
    return this.appService.getUserGroup(userId);
  }
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile('file') file: any, @Res() res) {
    return res.send(file);
  }
  @Put('avatar/:id')
  updateAvatar(@Body() avatarUrl: { url: string }, @Param('id') userId: string) {
    return this.appService.updateAvatar(userId, avatarUrl.url);
  }
  @Get('avatar/:id')
  getAvatar(@Param('id') url: string, @Res() res) {
    const filePath = '/Users/vaishnavkesherwani/web-chat/web-chat/dist/apps/api/avatar/' + url;
    return res.sendFile(filePath);
  }
}
