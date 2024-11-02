import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../models/api-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {


  private _http = inject(HttpClient);


  getFreelancer():Observable<ApiResponse>{
    return this._http.get<ApiResponse>(`${environment.BaseURL}/api/Freelancer/freelancer-profile`,{ })
    .pipe(
      catchError(error => {
        console.error('Error occurred in API call:', error);
        const errorMessage = error.status === 0
          ? 'Cannot connect to backend server. Please ensure the server is running.'
          : `Error Code: ${error.status}, Message: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    );}

    getFreelancerRequests(pageIndex: number = 1, pageSize: number = 12): Observable<ApiResponse> {
      let params = new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString());
      return this._http.get<ApiResponse>(`${environment.BaseURL}/api/Freelancer/get-freelancer-requests`,{ params})
    .pipe(
      tap(response => console.log('API response:', response)),

      catchError(error => {
        console.error('Error occurred in API call:', error);
        const errorMessage = error.status === 0
          ? 'Cannot connect to backend server. Please ensure the server is running.'
          : `Error Code: ${error.status}, Message: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    );}

    
    getFreelancerOfferedServices(freelancerId:string,pageIndex: number = 1, pageSize: number = 6): Observable<ApiResponse> {
      let params = new HttpParams()
      .set('freelancerId', freelancerId) 
             .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString());
      return this._http.get<ApiResponse>(`${environment.BaseURL}/api/Freelancer/get-offered-services`,{ params})
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
