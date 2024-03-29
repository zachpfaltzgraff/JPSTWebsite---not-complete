import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { signOut } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { EmailService } from '../../values.service';
import { AuthGuardService } from '../../auth-guard.service';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css'
})

export class HeaderBarComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private router: Router, private emailService: EmailService, private authGuard: AuthGuardService) {}

  ngOnInit() {
    this.currentAuthenticatedUser();
  }

  isLoggedIn(): boolean {
    return this.emailService.getLogin();
  }

  async currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      this.emailService.setLogin(true);

      this.isAdmin = await this.authGuard.isAdmin(this.router);
    } catch (err) {
      console.log(err);
      this.emailService.setLogin(false);
    }
  }

  signOut() {
    this.handleSignOut();
  }

  async handleSignOut() {
    try {
      await signOut();
      this.emailService.setLogin(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
