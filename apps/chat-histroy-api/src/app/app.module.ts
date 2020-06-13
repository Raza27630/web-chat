import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connection_str, Conversation, ConversationSchema, User, UserSchema } from '@web-chat/api-interfaces';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(connection_str),
    MongooseModule.forFeature([
      {
        name: Conversation.name, schema: ConversationSchema
      },
      {
        name: User.name, schema: UserSchema
      }
    ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
