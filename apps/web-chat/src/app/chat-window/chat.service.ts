import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '@web-chat/api-interfaces';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private readonly http: HttpClient) { }
  getChatHistory(chatId: string): Observable<IMessage[]> {
    return this.http.get(`api/chat/${chatId}`).pipe(pluck('messages'));
  }
  sendMessage(chatId: string, message: IMessage) {
    return this.http.put(`api/chat/${chatId}`, message);
  }
}
