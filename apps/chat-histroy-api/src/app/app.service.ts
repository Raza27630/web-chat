import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation, IMessage } from '@web-chat/api-interfaces';
import { Model } from 'mongoose';
import { from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Conversation.name) private readonly chatModel: Model<Conversation>) { }
  createChatRoom(members: string[]) {
    return from(this.chatModel.findOne({ members: { $all: members } })).pipe(switchMap(conversation => {
      if (conversation) {
        return of(conversation);
      }
      const chat = new this.chatModel({
        members,
        messages: []
      });
      return from(chat.save());
    }));

  }
  getChatHistory(chatId: string) {
    return from(this.chatModel.findOne({ _id: chatId }).populate('messages.sender').select('messages').exec());
  }
  getAllChatHistory(userId: string) {
    return from(this.chatModel.find({ members: { $eq: userId } }).populate('members').exec()).pipe(map(res => {
      return res.map(r => {
        const userInfo = r.members.filter(k => k['_id'].toString() !== userId)[0];
        return {
          _id: r._id,
          name: userInfo?.['displayName'],
          img: userInfo['img'],
          lastMessage: r.messages.splice(r.messages.length - 1, 1)?.[0]
        }
      })
    }));
  }
  updateChat(incomingMsg: IMessage, chatId: string) {
    return this.chatModel.findOne({ _id: chatId }, (er, res) => {
      if (!er) {
        res.messages.push(incomingMsg);
        res.save();
      }
    }).exec();
  }
}
