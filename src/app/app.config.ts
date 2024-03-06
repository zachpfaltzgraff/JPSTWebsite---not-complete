import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { EmailService } from '../values.service';
import { AuthGuardService } from '../auth-guard.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), EmailService, AuthGuardService, provideAnimations()]
};
