import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Conversation } from '@web-chat/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private readonly http: HttpClient) { }
  getAllMembers() {
    return this.http.get<User[]>('/api/alluser');
  }
  createChatRoom(members:string[]){
    return this.http.post<Conversation>('/api/chat',members);
  }
}
