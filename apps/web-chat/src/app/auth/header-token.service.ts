import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class HeaderTokenService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, handler: HttpHandler) {
    const userObj = JSON.parse(sessionStorage.getItem('user_ref'));
    if(userObj){
      const clone = req.clone({
        setHeaders: {
          userid: userObj?.['_id'],
          'Cache-Control': 'no-cache'
        }
      });
      return handler.handle(clone);
    }
    return handler.handle(req);
  }
}
