import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private _chatObserver$ = new Subject();
  private _memebersObserver$ = new Subject();
  constructor(private readonly router: Router) {
  }
  observerRouterEvents() {
    this.router.events.pipe(filter(e => (e instanceof NavigationEnd))).subscribe((routerEvt: NavigationEnd) => {
      if (routerEvt.url.toLowerCase().includes('/main/chat')) {
        this._chatObserver$.next();
      }
      if (routerEvt.url.toLowerCase() === '/main/members') {
        this._memebersObserver$.next();
      }
    });
  }
  get chatTabObserver$() {
    return this._chatObserver$.asObservable();
  }
  get memebersTabObserver$() {
    return this._memebersObserver$.asObservable();
  }
}
