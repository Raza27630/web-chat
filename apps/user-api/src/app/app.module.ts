import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connection_str, UserSchema, User, UserGroup, UserGroupSchema } from '@web-chat/api-interfaces';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(connection_str),
    MongooseModule.forFeature([
      {
        name: User.name, schema: UserSchema
      },
      {
        name: UserGroup.name, schema: UserGroupSchema
      }
    ])],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
