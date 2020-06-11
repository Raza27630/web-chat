import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'web-chat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly router: Router) {
    const userObjId = JSON.parse(sessionStorage.getItem('user_ref'))?.['_id'];
    if (!userObjId) {
      this.router.navigate(['auth', 'login']);
    } else {
      this.router.navigate(['main', 'chat']);
    }
  }
}
