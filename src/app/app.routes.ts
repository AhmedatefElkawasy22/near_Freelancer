import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent,title: 'Login' },
  { path: 'registration', component: RegistrationComponent ,title: 'Registration' },
  { path: '*', component: NotFoundComponent ,title: 'not-found-page' },
];
