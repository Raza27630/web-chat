import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto, User } from '@web-chat/api-interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }
  signUp(createUserDto: CreateUserDto) {
    return this.http.post<User>('/api/user', createUserDto).pipe(tap(user => sessionStorage.setItem('user_ref', JSON.stringify(user))));
  }
  signIn(userEmail: string) {
    return this.http.get<User>('/api/user', {
      params: {
        email: userEmail
      }
    }).pipe(tap(user => sessionStorage.setItem('user_ref', JSON.stringify(user))));
  }
  uploadAvatar(form: FormData) {
    return this.http.post(`/api/avatar`, form);
  }
  updateAvatarUrl(userId: string, url: string) {
    return this.http.put(`/api/avatar/${userId}`, { url });
  }
}
