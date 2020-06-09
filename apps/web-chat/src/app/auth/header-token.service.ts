import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class HeaderTokenService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, handler: HttpHandler) {
    const clone = req.clone();
    const userObj = JSON.parse(localStorage.getItem('user_ref'));
    clone.headers.append('userid', userObj?.['_id']);
    return handler.handle(clone);
  }
}
