import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from './tabs.service';

@Component({
  selector: 'web-chat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly router: Router,private readonly tabService:TabsService) {
    this.tabService.observerRouterEvents();
    const userObjId = JSON.parse(sessionStorage.getItem('user_ref'))?.['_id'];
    if (!userObjId) {
      this.router.navigate(['auth', 'login']);
    } else {
      this.router.navigate(['main', 'chat']);
    }
  }
}
