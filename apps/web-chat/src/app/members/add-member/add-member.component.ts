import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { User } from '@web-chat/api-interfaces';
import { MembersService } from '../members.service';
import { switchMap, filter, catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { SrvRecord } from 'dns';

@Component({
  selector: 'web-chat-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMemberComponent implements OnInit {
  user$: Observable<User[]>;
  private readonly _searchText$ = new Subject<string>();
  private _type = {
    success: 1,
    error: 2
  };
  constructor(private readonly memberService: MembersService,
    private readonly toastController: ToastController) { }

  ngOnInit(): void {
    this.user$ = this._searchText$.asObservable().pipe(filter(k => !!k),
      switchMap(text => this.memberService.searchUser(text)))
  }
  findUser(text: string) {
    if (!text) {
      return;
    }
    this._searchText$.next(text);
  }
  addUserToGroup(member: User) {
    this.memberService.addUserToGroup(member._id).pipe(catchError(er => {
      return this.openToast('Error occured.', this._type.error)
    }), switchMap(() =>
      this.openToast('User added to your contacts.', this._type.success))).subscribe(toast => {
        toast.present();
      });
  }
  openToast(message: string, type: number) {
    return from(this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: type === this._type.success ? 'success' : 'danger'
    }));

  }
}
