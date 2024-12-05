import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private _HttpClient: HttpClient) { }

  ForgetPassword(email: any): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this._HttpClient.post(
      `${environment.BaseURL}/api/Account/forgot-password`,
      {},
      {
        params,
        responseType: 'text',
      }
    );
  }

  verifyOTP(body: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.BaseURL}/api/Account/verify-otp`, body, { responseType: 'text' }
    );
  }

  resetPassword(body: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.BaseURL}/api/Account/reset-password`, body,
      { responseType: 'text' }
    );
  }

  ChangePassword(body: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.BaseURL}/api/Account/change-password`, body,
      { responseType: 'text' }
    );
  }

  // get data info user
  getCustomerInfo(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.BaseURL}/api/Account/profile`);
  }

  //Delete Account 
  DeleteAccoutn(): Observable<any> {
    return this._HttpClient.delete(
      `${environment.BaseURL}/api/Account/delete-account`,
      { responseType: 'text' }
    );
  }

  //update data info user
  UpdateProfile(body: any): Observable<any> {
    return this._HttpClient.put(
      `${environment.BaseURL}/api/Account/update-customer-info`, body,
      { responseType: 'text' }
    );
  }


}
