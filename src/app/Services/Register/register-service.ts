import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _HttpClient: HttpClient) {
  }

  registerUser(bodyData: any): Observable<any> {
    return this._HttpClient.post<any>(`${environment.BaseURL}/api/Account/register`, bodyData);
  }
}