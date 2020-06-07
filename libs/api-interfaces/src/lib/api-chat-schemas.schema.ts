import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as DocSchema } from 'mongoose';
import { User } from './api-user-schemas.schema';

@Schema()
export class Conversation extends Document {
    @Prop([{
        type: DocSchema.Types.ObjectId,
        ref: User.name,
        required: true
    }])
    members: string[];
    @Prop(raw([{
        sender: DocSchema.Types.ObjectId,
        timeStamp: Date,
        message: String,

    }]))
    messages: {
        sender: string;
        timeStamp: Date;
        message: string;
    }[];
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);

@Schema()
export class PersonalisedChat extends Document {
    @Prop([{
        type: DocSchema.Types.ObjectId,
        ref: Conversation.name
    }])
    chats: string[];
    @Prop({
        type: DocSchema.Types.ObjectId,
        ref: User.name,
        required: true,
        unique: true
    })
    user: string;
}
export const PersonalisedChatSchema = SchemaFactory.createForClass(PersonalisedChat);