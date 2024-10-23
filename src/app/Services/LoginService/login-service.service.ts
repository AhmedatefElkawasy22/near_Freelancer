import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _HttpClient: HttpClient) { }

  // Function to handle login API request
  LoginUser(bodyData: any): Observable<any> {
    return this._HttpClient.post<any>(`${environment.BaseURL}/api/Account/login`, bodyData);
  }

  // // BehaviorSubject to track login status
  // private _islogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getstuteslogin());

  // public get islogin(): BehaviorSubject<boolean> {
  //   return this._islogin;
  // }

  // Method to handle login, storing the token in localStorage and updating login status
  // login(token: string): void {
  //   if (token) {
  //     localStorage.setItem('token', token);
  //     this.islogin.next(true);
  //   }
  // }

  // // Method to handle logout, removing the token and updating login status
  // logout(): void {
  //   localStorage.removeItem('token');
  //   this.islogin.next(false);
  // }

  // Method to check login status based on the presence of a token
  // getstuteslogin(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  // // Method to retrieve the stored token
  // getToken(): string {
  //   return localStorage.getItem('token') || ''; 
  // }
}
