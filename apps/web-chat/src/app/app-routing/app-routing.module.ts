import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderTokenService } from '../auth/header-token.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../main/main.module').then(m => m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'chat-window/:chatId',
    loadChildren: () => import('../chat-window/chat-window.module').then(m => m.ChatWindowModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HeaderTokenService, multi: true
    }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
