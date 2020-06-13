import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MembersService } from './members.service';
import { Observable } from 'rxjs';
import { User, IUserGroupUI } from '@web-chat/api-interfaces';
import { Router } from '@angular/router';
import { TabsService } from '../tabs.service';
import { switchMap, pluck } from 'rxjs/operators';

@Component({
  selector: 'web-chat-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {
  members$: Observable<User[]>;
  constructor(
    private readonly membersService: MembersService,
    private readonly router: Router,
    private readonly tabService: TabsService) { }

  ngOnInit(): void {
    this.members$ = this.tabService.memebersTabObserver$.pipe(switchMap(() => this.membersService.getUserGroup()));
  }
  openChat(member: User) {
    const userObjId = JSON.parse(sessionStorage.getItem('user_ref'))?.['_id'];
    this.membersService.createChatRoom([userObjId, member._id]).subscribe((res) => {
      this.router.navigate(['chat-window', res._id], {
        queryParams: {
          activeMember: member.displayName,
          activeMemberId: member._id
        }
      });
    });
  }
}
