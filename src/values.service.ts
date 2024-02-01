import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private userEmail: string = '';
  private password: string = '';
  private isLoggedIn: boolean = false;

  setPassword(password: string) {
    this.password = password;
  }

  getPassword() {
    return this.password;
  }

  setEmail(email: string) {
    this.userEmail = email;
  }

  getEmail(): string {
    return this.userEmail;
  }

  setLogin(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }
  getLogin(): boolean {
    return this.isLoggedIn;
  }
}
