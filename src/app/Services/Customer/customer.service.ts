import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../Models/api-response';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

   private _http = inject(HttpClient);


  getCustomer(id:string):Observable<ApiResponse>{
    return this._http.get<ApiResponse>(`${environment.BaseURL}/api/Account/get-customer-by-id/${id}`,{ })
    .pipe(
      catchError(error => {
        console.error('Error occurred in API call:', error);
        const errorMessage = error.status === 0
          ? 'Cannot connect to backend server. Please ensure the server is running.'
          : `Error Code: ${error.status}, Message: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    );}

    getCustomerRequests(pageIndex: number = 1, pageSize: number = 12): Observable<ApiResponse> {
      let params = new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString());
      return this._http.get<ApiResponse>(`http://localhost:5104/api/Account/get-requests?pageIndex=1&pageSize=10`,{ })
    .pipe(
      catchError(error => {
        console.error('Error occurred in API call:', error);
        const errorMessage = error.status === 0
          ? 'Cannot connect to backend server. Please ensure the server is running.'
          : `Error Code: ${error.status}, Message: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    );}

    
}
