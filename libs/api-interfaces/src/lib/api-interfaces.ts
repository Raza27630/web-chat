export interface Message {
  message: string;
}

export interface CreateUserDto {
  readonly userEmail: string;
  readonly displayName: string;
  readonly imgUrl?: string;
}
