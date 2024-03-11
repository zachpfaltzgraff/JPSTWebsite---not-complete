import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { fetchAuthSession } from 'aws-amplify/auth';
  import { from, lastValueFrom } from 'rxjs';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor() {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return from(this.handle(req, next));
    }
  
    async handle(req: HttpRequest<any>, next: HttpHandler) {
      // Get the auth token from the service.
      let res = await this.currentSession();
      console.log(res.toString());
      
      let authReq: HttpRequest<any>;
      try {
        authReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            res.toString()
          ),
        });
      } catch (error) {
        console.error(error);
        authReq = req.clone();
      }
  
      // send cloned request with header to the next handler.
      return lastValueFrom(next.handle(authReq));
    }
    
    async currentSession():Promise<any> {
        try {
        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        return idToken;
        } catch (err) {
        console.log(err);
        return err;
        }
    }
  }