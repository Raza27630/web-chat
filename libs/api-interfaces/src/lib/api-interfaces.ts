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
