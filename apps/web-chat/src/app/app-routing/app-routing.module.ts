import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HeaderTokenService, multi: true
    }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
