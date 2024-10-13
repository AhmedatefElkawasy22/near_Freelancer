import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LayoutComponent } from './Shared/layout/layout.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', component:LayoutComponent, 
    children: [
      { path:'', redirectTo: '/home', pathMatch: 'full'},
      { path:'home',component:HomeComponent, pathMatch: 'full'},
    ]
   }
];
