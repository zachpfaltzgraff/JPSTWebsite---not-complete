import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import cdkOutput from '../../../../jpstCDK/output.json';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-admin-register-page',
  standalone: true,
  imports: [CommonModule, InputTextModule, TableModule, CheckboxModule ],
  templateUrl: './admin-register-page.component.html',
  styleUrl: './admin-register-page.component.css'
})
export class AdminRegisterPageComponent {
  constructor(private http: HttpClient) {};

  apiEndpoint = cdkOutput.LambdaStack.APIEndpoint1793E782;
  userData: any;
  totalCost: number = 0;

  ngOnInit(): void {
    this.http.get<any>(this.apiEndpoint + 'swimmer/scan-data-swimmer')
    .pipe(catchError(error => {
      console.error('Error: ', error);
      return throwError(error);
    }))
    .subscribe(response => {
      this.userData = response.data;
      console.log('Retrieved user data:', this.userData);
      this.totalCost += Number(this.userData.cost.S);
    });
  }

  onCheckboxChange(product: any): void {
    const formData = { 
      accountID: product.accountID.S,
      swimmerName: product.swimmer.M.firstName.S + ' ' + product.swimmer.M.lastName.S,
      hasPaid: !product.hasPaid.BOOL,
    };

    this.http.put(this.apiEndpoint + 'user/has-paid-swimmer', formData)
        .pipe(
          catchError(error => {
            console.error('Error: ', error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Response: ', response);
        });
  }
}
