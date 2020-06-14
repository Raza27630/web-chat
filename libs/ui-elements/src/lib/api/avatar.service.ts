import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private readonly http: HttpClient) { }
  getAvatar(encriptedUrl: string) {
    return this.http.get(`/api/avatar/${encriptedUrl}`, {
      responseType: 'arraybuffer'
    });
  }
}
