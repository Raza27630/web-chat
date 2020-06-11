import { Component, OnInit } from '@angular/core';
import { MembersService } from './members.service';
import { Observable } from 'rxjs';
import { User } from '@web-chat/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'web-chat-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members$: Observable<User[]>;
  constructor(
    private readonly membersService: MembersService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.members$ = this.membersService.getAllMembers();
  }
  openChat(member: User) {
    const userObjId = JSON.parse(sessionStorage.getItem('user_ref'))?.['_id'];
    this.membersService.createChatRoom([userObjId, member._id]).subscribe((res) => {
      this.router.navigate(['chat-window', res._id], {
        queryParams: {
          activeMember: member.displayName
        }
      });
    });
  }
}
