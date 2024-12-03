import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../Services/AccountService/account.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/Login/login-service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  ChangePasswordForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _AccountService: AccountService,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.ChangePasswordForm = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            ),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            ),
          ],
        ],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validator: this.mustMatch('newPassword', 'confirmNewPassword'),
      }
    );
  }

  get oldPassword() {
    return this.ChangePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.ChangePasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.ChangePasswordForm.get('confirmNewPassword');
  }

  onSubmit(): void {
    this.submitted = true;
   
    if (this.ChangePasswordForm.invalid) {
      //console.log('data', this.ChangePasswordForm.value);
      //console.log('err', this.ChangePasswordForm.errors);
      this.openAlertDialog('Error', 'Please ensure all fields are filled correctly.');
      return;
    }

    this._AccountService.ChangePassword(this.ChangePasswordForm.value).subscribe(
      (response) => {
        // console.log(response);
        this.openAlertDialog(
          'Success',
          'Password changed successfully. Please log in again.'
        );
        setTimeout(() => {
          this._loginService.logout();
          this._router.navigate(['/login']);
        }, 3000);
      },
      (error) => {
        // console.log(error);
        this.openAlertDialog('Error', 'An unexpected error occurred , make sure all data is correct then try again.');
      }
    );
  }

  mustMatch(newPassword: string, confirmNewPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[newPassword];
      const confirmPassControl = formGroup.controls[confirmNewPassword];

      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      confirmPassControl.setErrors(
        passControl.value !== confirmPassControl.value ? { mustMatch: true } : null
      );
    };
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title, message },
    });
  }
}
