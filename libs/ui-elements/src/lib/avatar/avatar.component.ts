import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'web-chat-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarComponent implements OnInit {
  url$ = new BehaviorSubject<string>('');
  @Input() set url(value: string) {
    if (value) {
      this.url$.next(value);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
