import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ChatHistoryService } from './chat-history.service';
import { IChatHistoryInfo } from '@web-chat/api-interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TabsService } from '../tabs.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'web-chat-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  chatInfo$: Observable<IChatHistoryInfo[]>;
  constructor(private readonly chatHistoryService: ChatHistoryService,
    private readonly router: Router,
    private readonly tabService: TabsService) {
  }

  ngOnInit(): void {
    this.chatInfo$ = this.tabService.chatTabObserver$.pipe(switchMap(() => this.chatHistoryService.getChatHistory()))

  }
  openChat(chat: IChatHistoryInfo) {
    this.router.navigate(['chat-window', chat._id], {
      queryParams: {
        activeMember: chat.name,
        activeMemberImg: chat.img
      }
    });
  }
  ngOnDestroy() {
    console.log('destroy called')
  }
}
