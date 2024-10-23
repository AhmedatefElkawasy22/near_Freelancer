import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginServiceService } from '../../Services/LoginService/login-service.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  UserLoginForm: FormGroup;

  constructor(
    private _loginService: LoginServiceService,
    private dialog: MatDialog
  ) {
    this.UserLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.UserLoginForm.valid) {
      //console.log(this.UserLoginForm.value);
      this._loginService.LoginUser(this.UserLoginForm.value).subscribe(
        (data) => {
          this.openAlertDialog('Success', 'wellcome 😊');
          // save token in local storage
          // navigate to Home page
        },
        (error) => {
          //console.log('res', error);
          this.openAlertDialog('Error', error.error.message);
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
