import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Conversation, IUserGroupUI, UserGroup } from '@web-chat/api-interfaces';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private readonly http: HttpClient) { }
  getAllMembers() {
    return this.http.get<User[]>('/api/alluser');
  }
  createChatRoom(members: string[]) {
    return this.http.post<Conversation>('/api/chat', members);
  }
  getUserGroup(): Observable<User[]> {
    return this.http.get<User[]>('/api/userGroup').pipe(pluck('members'));
  }
  searchUser(searchText: string) {
    return this.http.get<User[]>('/api/searchUser', {
      params: {
        text: searchText
      }
    });
  }
  addUserToGroup(memberId: string) {
    return this.http.post<UserGroup>(`/api/addUserToGroup/${memberId}`, null);
  }
}
