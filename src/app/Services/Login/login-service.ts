import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedin = signal<boolean>(false);
  constructor(private _HttpClient:HttpClient,private router : Router) {
    if(this.getUserToken())
      {
        this.isLoggedin.update(()=>true);
      }
   }

  LoginUser(bodyData: any): Observable<ApiResponse>
  {
    return this._HttpClient.post<ApiResponse>(`${environment.BaseURL}/api/Account/login`, bodyData).pipe(
      map((response)=>{
        if(response.data.success&&response.data.token)
        {
          localStorage.setItem('token',response.data.token);
          this.isLoggedin.update(()=>true);
          this.router.navigate(['/home']);
        }
        return response;
      })
     );
  }

  getTokenClaims(): any {
    const token = this.getUserToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      const tokenClaims = {
        id: decoded['id'],
        name: decoded['name'],
        email: decoded['email'],
        roles: decoded['roles']
      }
      return tokenClaims;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }
  
  isTokenExpired(): boolean {
    const token = this.getUserToken();
    if (!token) return true; 
  
    try {
      const decoded: any = jwtDecode(token); 
      const isTokenExpired = Date.now() >= decoded['exp']! * 1000;     
      if(isTokenExpired) this.logout();
        return isTokenExpired;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return true; 
    }
  }

  logout(){
    this.isLoggedin.update(()=>false);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getUserToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
}


