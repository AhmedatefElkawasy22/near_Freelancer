import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/Login/login-service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService=inject(LoginService);
  const router=inject(Router);
  if (loginService.isLoggedin()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loginService.getUserToken()}`,
      }})};



        
  return next(req).pipe(
    retry(2),
    catchError((e , HttpErrorResponse) => {
      if(e.status===401)
      {
        localStorage.removeItem('token');
        router.navigate(['']);
      }

      const error = e.error.message || e.statusText;
      return throwError(() => error);
    }
  ));
};
