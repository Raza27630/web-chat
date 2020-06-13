import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as DocSchema } from 'mongoose';
import { User } from './api-user-schemas.schema';
import { IMessage } from './api-interfaces';

@Schema()
export class Conversation extends Document {
    @Prop([{
        type: DocSchema.Types.ObjectId,
        ref: User.name,
        required: true
    }])
    members: string[];
    @Prop(raw([{
        sender: { type: DocSchema.Types.ObjectId, ref: User.name },
        timeStamp: Date,
        message: String,
        seen: Boolean
    }]))
    messages: IMessage[];
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