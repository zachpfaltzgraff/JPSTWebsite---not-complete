import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { EmailService } from '../email.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), EmailService]
};
