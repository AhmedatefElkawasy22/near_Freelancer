import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  private _http = inject(HttpClient);

  paginatedFilteredFreelancers(pageIndex: number = 1, search: string = '', pageSize: number = 12): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this._http.get<ApiResponse>(`${environment.BaseURL}/api/Freelancer/filter-freelancers`, { params })
    .pipe(
      catchError(error => {
        console.error('Error occurred in API call:', error);
        const errorMessage = error.status === 0
          ? 'Cannot connect to backend server. Please ensure the server is running.'
          : `Error Code: ${error.status}, Message: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    );
  
  }
}
