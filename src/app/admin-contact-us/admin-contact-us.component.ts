import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import cdkOutput from '../../../../jpstCDK/output.json';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contact-us.component.html',
  styleUrl: './admin-contact-us.component.css'
})
export class AdminContactUsComponent {
    userData: any;

    constructor(private http: HttpClient) {}

    apiEndpoint = cdkOutput.LambdaStack.APIEndpoint1793E782;

    ngOnInit(): void {
      this.http.get<any>(this.apiEndpoint + 'user/get-data-contact')
      .pipe(catchError(error => {
        console.error('Error: ', error);
        return throwError(error);
      }))
      .subscribe(response => {
        this.userData = response.data;
        console.log('Retrieved user data:', this.userData);
      });
    }
}
