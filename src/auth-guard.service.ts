import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { getCurrentUser } from 'aws-amplify/auth';
@Injectable()


export class AuthGuardService {
  constructor( public router: Router) {}
  canActivate(): Promise<boolean | UrlTree> {
    let promise = new Promise<boolean | UrlTree>((resolve, reject) => {
      getCurrentUser().then(value => {
        if (value) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
      .catch(error => {
        console.error(error);
        resolve(this.router.parseUrl('/login'));
      })
    });

    return promise;
  }
}