import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LayoutComponent } from './Shared/Layout/layout.component';
import { CustomerProfileComponent } from './Components/customer-profile/customer-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', component:LayoutComponent, 
    children: [
      { path:'', redirectTo: '/home', pathMatch: 'full'},
      { path:'home',component:HomeComponent, pathMatch: 'full'},
      { path:'customerprofile',component:CustomerProfileComponent, pathMatch: 'full'},

    ]
   },
   {path: '**', component: NotFoundComponent}
  ];





