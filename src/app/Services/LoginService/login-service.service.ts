import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _HttpClient:HttpClient) { }

  LoginUser(bodyData: any): Observable<any>
  {
    return this._HttpClient.post<any>(`${environment.BaseURL}/api/Account/login`, bodyData);
  }
}
