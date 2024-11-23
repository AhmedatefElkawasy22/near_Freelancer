import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../models/api-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment.development';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../Components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _MatDialog = inject(MatDialog);

  getFreelancer(freelancerId?: string): Observable<ApiResponse> {
    const url = freelancerId
      ? `${environment.BaseURL}/api/Freelancer/get-freelancer-by-id/${freelancerId}`
      : `${environment.BaseURL}/api/Freelancer/freelancer-profile`;
  
    return this._http.get<ApiResponse>(url).pipe(
      catchError(error => {
        console.error('Error occurred in API call:', error);
        const errorMessage = error.status === 0
          ? 'Cannot connect to backend server. Please ensure the server is running.'
          : `Error Code: ${error.status}, Message: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
    getFreelancerRequests(pageIndex: number = 1, pageSize: number = 12): Observable<ApiResponse> {
      let params = new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString());
      return this._http.get<ApiResponse>(`${environment.BaseURL}/api/Freelancer/get-freelancer-requests`,{ params})
    .pipe(
      tap(response => console.log('API response:', response)),

        catchError((error) => {
          console.error('Error occurred in API call:', error);
          const errorMessage =
            error.status === 0
              ? 'Cannot connect to backend server. Please ensure the server is running.'
              : `Error Code: ${error.status}, Message: ${error.message}`;
          return throwError(() => new Error(errorMessage));
        })
      );
  }

    
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
  

    acceptRequest(requestId:string)
    {
     return this._http.post<ApiResponse>(`${environment.BaseURL}/api/Freelancer/accept/${requestId}`,{})
     .pipe(
      catchError(error => {
        console.error('Error occurred in API call:', error);
        const errorMessage = error.status === 0
          ? 'Cannot connect to backend server. Please ensure the server is running.'
          : `Error Code: ${error.status}, Message: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    );}

    refuseRequest(requestId:string)
    {
     return this._http.post<ApiResponse>(`${environment.BaseURL}/api/Freelancer/accept/${requestId}`,{})
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
