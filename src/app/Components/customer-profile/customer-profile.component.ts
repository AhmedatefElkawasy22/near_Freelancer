import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../Services/Login/login-service';
import { CustomerService } from '../../Services/Customer/customer.service';
import { CustomerProfileInformation } from '../../models/customer-profile-information';
import { CustomerRequestResult } from '../../models/customer-request-result';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AccountService } from '../../Services/AccountService/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatCheckboxModule],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  userId: string | null = null;
  customerProfileInfo: CustomerProfileInformation | null = null;
  requests: CustomerRequestResult[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  private loginService = inject(LoginService);
  private customerService = inject(CustomerService);
  private _router = inject(Router);
  private _accountService = inject(AccountService);
  private dialog = inject(MatDialog);


  ngOnInit() {
    const claims = this.loginService.getTokenClaims();
    if (claims) {
      this.userId = claims.id;
      console.log('User ID:', this.userId);
      this.getCustomerInfo();
    } else {
      console.error('User is not logged in or token claims are not available.');
    }
  }

  getCustomerInfo() {
    if (this.userId) {
      this.customerService.getCustomer(this.userId).subscribe(
        (response) => {
          this.customerProfileInfo = response.data;
          this.getCustomerRequests();

          console.log('Customer Details:', response);
        },
        (error) => {
          console.error('Error fetching customer details:', error);
        }
      );
    } else {
      console.error('User ID is not available.');
    }
  }

  getCustomerRequests() {
    if (this.userId !== null) {
      this.customerService
        .getCustomerRequests(this.pageIndex, this.pageSize)
        .subscribe(
          (response) => {
            this.requests = response.data;
            this.totalPages = response.data.totalPages;
            console.log('Requests Details:', response);
          },
          (error) => {
            console.error('Error fetching requests details:', error);
          }
        );
    } else {
      console.error('User not found.');
    }
  }

  onPageChange(newPageIndex: number): void {
    if (newPageIndex > 0 && newPageIndex <= this.totalPages) {
      this.pageIndex = newPageIndex;
      this.getCustomerRequests();
    }
  }

  DeleteAccount() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete your Account? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._accountService.DeleteAccoutn().subscribe((response) => {
          // console.log('Account deleted successfully:', response);
          this.openAlertDialog(
            'Success',
            'Your account has been deleted successfully'
          );
          setTimeout(() => {
            this._router.navigateByUrl('/registration');
          }, 3000);
        }, (error) => {
          // console.error('Error deleting account:', error);
          this.openAlertDialog('Error', 'There is a problem, if you have your own work, please delete it first.');
        });
      } else {
        // console.log("Deletion canceled by the user.");
      }
    });
  }
  UpdateProfile() {
    this._router.navigateByUrl('/updateprofile');
  }
  ChangePassword() {
    this._router.navigateByUrl('/changepassword');
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
