import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import cdkOutput from '../../../../jpstCDK/output.json';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-admin-register-page',
  standalone: true,
  imports: [CommonModule, InputTextModule, TableModule ],
  templateUrl: './admin-register-page.component.html',
  styleUrl: './admin-register-page.component.css'
})
export class AdminRegisterPageComponent {
  constructor(private http: HttpClient) {};

  apiEndpoint = cdkOutput.LambdaStack.APIEndpoint1793E782;
  userData: any;

  ngOnInit(): void {
    this.http.get<any>(this.apiEndpoint + 'swimmer/scan-data-swimmer')
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
