import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../Services/Login/login-service';
import { CustomerService } from '../../Services/Customer/customer.service';
import { CustomerProfileInformation } from '../../models/customer-profile-information';
import { CustomerRequestResult } from '../../models/customer-request-result';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FreelancerService } from '../../Services/Freelancer/freelancer.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';

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
  private _freelancerService = inject(FreelancerService);
  private dialog = inject(MatDialog);
  private _router = inject(Router);

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


  DeleteFreelancerBusiness() {
    console.log('Delete Freelancer Business');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete your business? This action cannot be undone.'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._freelancerService.deleteFreelancerBusiness().subscribe({
          next: (response) => {
            console.log("Business deleted successfully:", response);
            this.openAlertDialog('Success', 'Your business has been deleted successfully');
            setTimeout(() => {
              this._router.navigateByUrl('/home');
            }, 3000);
          },
          error: (err) => {
            console.error("Error occurred during deletion:", err);
            this.openAlertDialog('Error', 'Failed to delete your business');
          }
        });
      } else {
        // console.log("Deletion canceled by the user.");
      }
    });
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
