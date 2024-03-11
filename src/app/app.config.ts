import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { EmailService } from '../values.service';
import { AuthGuardService } from '../auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Added HTTP_INTERCEPTORS import
import { AuthInterceptor } from '../auth-intercepter.service'; // Assuming AuthInterceptor is the interceptor you want to use
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    EmailService,
    AuthGuardService,
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Provided HTTP_INTERCEPTORS correctly
  ]
};
