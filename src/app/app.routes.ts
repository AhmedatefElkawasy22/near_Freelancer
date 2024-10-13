import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
<<<<<<< HEAD
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
=======
import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent,title: 'Login' },
  { path: 'registration', component: RegistrationComponent ,title: 'Registration' },
  { path: '*', component: NotFoundComponent ,title: 'not-found-page' },
>>>>>>> 3b618e7bd9479d6ddcb145d1ca7f908f0c73d783
];
