import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, switchMap, tap, map, withLatestFrom, take, scan } from 'rxjs/operators';
import { ChatService } from './chat.service';
import { IMessage } from '@web-chat/api-interfaces';
import { Observable, merge, Subject, of } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import * as io from 'socket.io-client';

@Component({
  selector: 'web-chat-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  displayName: string;
  messages$: Observable<IMessage[]>;
  myId: string;
  newMsg$ = new Subject<IMessage>();
  msgCtrl = new FormControl('', [Validators.minLength(1)]);
  chatId: string;
  socket = io('http://localhost:3333/chat');
  constructor(private readonly routerSnapShot: ActivatedRoute,
    private readonly chatService: ChatService) {
    this.myId = JSON.parse(sessionStorage.getItem('user_ref'))?.['_id'];
    this.displayName = this.routerSnapShot.snapshot.queryParamMap.get('activeMember');
  }

  ngOnInit(): void {
    const onLoad$ = this.routerSnapShot.params.pipe(pluck('chatId'), take(1), tap(id => {
      this.chatId = id;
      this.socket.emit('joinChat', this.chatId);
    }), switchMap(chat => this.chatService.getChatHistory(chat)));
    // scoket msges
    const socketMsg$ = this.newMsg$.asObservable().pipe(map(e => [e]));
    this.messages$ = merge(onLoad$, socketMsg$).pipe(scan((acc, crr) => [...acc, ...crr], []));
    this.socket.on('msgToClients', (msg: IMessage) => {
      console.log(msg);
      this.newMsg$.next(msg);
    });
    this.socket.on('joinedRoom', (msg) => console.log(msg));
  }
  sendMsg() {
    const msg = {
      message: this.msgCtrl.value,
      seen: false,
      sender: this.myId,
      timeStamp: new Date()
    }
    this.chatService.sendMessage(this.chatId, msg).subscribe();
    this.msgCtrl.setValue('');
    this.socket.emit('pingToServer', { room: this.chatId, message: msg });
  }
  ngOnDestroy() {
    this.socket.emit('leaveChat', this.chatId);
  }
}
