import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private userEmail: string = '';

  setEmail(email: string) {
    this.userEmail = email;
  }

  getEmail(): string {
    return this.userEmail;
  }
}
