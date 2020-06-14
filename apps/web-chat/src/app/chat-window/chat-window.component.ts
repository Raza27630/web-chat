import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, switchMap, tap, map, take, scan } from 'rxjs/operators';
import { ChatService } from './chat.service';
import { IChatMessage } from '@web-chat/api-interfaces';
import { Observable, merge, Subject, of } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import * as io from 'socket.io-client';

@Component({
  selector: 'web-chat-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContent') scrollContent: ElementRef<HTMLDivElement>;
  displayName: string;
  displayImg: string;
  messages$: Observable<IChatMessage[]>;
  myId: string;
  myName: string;
  newMsg$ = new Subject<IChatMessage>();
  msgCtrl = new FormControl('', [Validators.minLength(1)]);
  chatId: string;
  socket = io('http://localhost:3333/chat');
  constructor(private readonly routerSnapShot: ActivatedRoute,
    private readonly chatService: ChatService) {
    const user = JSON.parse(sessionStorage.getItem('user_ref'));
    this.myId = user?.['_id'];
    this.myName = user?.['displayName'];
    this.displayName = this.routerSnapShot.snapshot.queryParamMap.get('activeMember');
    this.displayImg = this.routerSnapShot.snapshot.queryParamMap.get('activeMemberImg') || '';
  }

  ngOnInit(): void {
    const onLoad$ = this.routerSnapShot.params.pipe(pluck('chatId'), take(1), tap(id => {
      this.chatId = id;
      this.socket.emit('joinChat', this.chatId);
    }), switchMap(chat => this.chatService.getChatHistory(chat)));
    // scoket msges
    const socketMsg$ = this.newMsg$.asObservable().pipe(map(e => [e]));
    this.messages$ = merge(onLoad$, socketMsg$).pipe(scan((acc, crr) => [...acc, ...crr], []),
      tap(() => setTimeout(() => this.scrollToBottom(), 200)));
    this.socket.on('msgToClients', (msg: IChatMessage) => {
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
    this.socket.emit('pingToServer', {
      room: this.chatId,
      message: { ...msg, ...{ sender: { _id: this.myId, displayName: this.myName } } }
    });
  }
  ngOnDestroy() {
    this.socket.emit('leaveChat', this.chatId);
  }
  scrollToBottom() {
    this.scrollContent.nativeElement.scroll(0, this.scrollContent.nativeElement.scrollHeight);
  }
}
