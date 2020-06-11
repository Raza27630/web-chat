import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connection_str, Conversation, ConversationSchema } from '@web-chat/api-interfaces';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ 
    MongooseModule.forRoot(connection_str),
    MongooseModule.forFeature([
      {
        name: Conversation.name, schema: ConversationSchema
      }
    ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
