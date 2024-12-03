import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../Services/Login/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, NgIf,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  UserLoginForm: FormGroup;

  constructor(
    private _loginService: LoginService,
    private dialog: MatDialog,
    private _router: Router
  ) {
    this.UserLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
     
    if (this.UserLoginForm.valid) {
      this._loginService.LoginUser(this.UserLoginForm.value).subscribe(
        (data) => {
          this.openAlertDialog('Success', 'wellcome 😊');
        },
        (error) => {
          //  console.log('res', error);
          this.openAlertDialog('Error', error);
          this._router.navigate(['/login']);
        }
      );
    } else {
      this.openAlertDialog('Error', 'Please fill in the data correctly.');
    }
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
