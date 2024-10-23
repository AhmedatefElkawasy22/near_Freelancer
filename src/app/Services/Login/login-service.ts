import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { TokenClaims } from '../../models/tokenClaims';

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

  getUserRoles():Observable<ApiResponse>
  {
    return this._HttpClient.get<ApiResponse>(`${environment.BaseURL}/api/Account/user-roles`).pipe(
      map((response)=>{
        return response;
      })
    );
  }


  getTokenClaims(): TokenClaims | null {
    const token = this.getUserToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      console.log(decoded); 
      const tokenClaims = {
        id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'], // Update this line
        name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        roles: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };  
      console.log('Token claims:', tokenClaims);
      return tokenClaims;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }
  
  
  isTokenValid(): boolean {
    const token = this.getUserToken();
    if (!token) return true; 
  
    try {
      const decoded: any = jwtDecode(token); 
      const isTokenExpired = Date.now() >= decoded['exp']! * 1000;     
      if(isTokenExpired) this.logout();
        return !isTokenExpired;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return false; 
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


