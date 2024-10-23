import { inject } from '@angular/core';
import { LoginService } from '../../Services/Login/login-service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

const loginService=inject(LoginService);
const router=inject(Router);
if(!loginService.isLoggedin())
   {router.navigate(['login']);} 

  return true;
  
};
