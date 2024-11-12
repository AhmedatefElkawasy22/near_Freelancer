import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LayoutComponent } from './Shared/Layout/layout.component';
import { CustomerProfileComponent } from './Components/customer-profile/customer-profile.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { EnterOTPComponent } from './Components/enter-otp/enter-otp.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { FreelancerProfileComponent } from './Components/freelancer-profile/freelancer-profile.component';
import { AddFreelancerBusinessComponent } from './Components/add-freelancer-business/add-freelancer-business.component';
import { SendServiceRequestComponent } from './Components/send-service-request/send-service-request.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', redirectTo: '/home', pathMatch: 'full' }],
  },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'customerprofile',component: CustomerProfileComponent,title: 'Customer Profile',
  }, {
    path: 'freelancerprofile',component: FreelancerProfileComponent,title: 'freelancer Profile',
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration',
  },
  {
    path: 'ForgotPassword',
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
  },
  { path: 'EnterOTP', component: EnterOTPComponent, title: 'Enter OTP' },
  {
    path: 'ResetPassword',
    component: ResetPasswordComponent,
    title: 'Reset Password',
  },
  {path:'addFreelancerBusiness', component: AddFreelancerBusinessComponent , title:"Add Freelancer Business"},
  {path:'SendServiceRequest', component: SendServiceRequestComponent , title:"Send Service Request"},
  { path: '**', component: NotFoundComponent, title: 'not-found-page' },
];
