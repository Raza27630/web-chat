import { User } from './api-user-schemas.schema';

export interface IMessage {
  sender: string;
  timeStamp: Date;
  message: string;
  seen: boolean;
}

export interface CreateUserDto {
  readonly userEmail: string;
  readonly displayName: string;
  readonly imgUrl?: string;
}

export interface UpdateChatDto {
  chatId: string;
  message: IMessage;
}
export interface IChatMessage {
  sender: {
    _id: string,
    displayName: String
  }
  timeStamp: Date;
  message: string;
  seen: boolean;
}
export interface IChatHistoryInfo {
  _id: string;
  name: string;
  lastMessage?: IMessage;
}
export interface IUserGroupUI {
  _id: string;
  groupUser: string;
  members: User[]
}
