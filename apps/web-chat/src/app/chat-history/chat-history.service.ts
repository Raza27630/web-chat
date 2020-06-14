import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChatHistoryInfo } from '@web-chat/api-interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatHistoryService {

  constructor(private readonly http: HttpClient) { }
  getChatHistory() {
    return this.http.get<IChatHistoryInfo[]>('/api/chat').pipe(map(chatInfo =>
      chatInfo.filter(x => !!x.lastMessage).sort((a, b) =>
        (new Date(b.lastMessage.timeStamp).getTime()) - (new Date(a.lastMessage.timeStamp).getTime()))));
  }
}
