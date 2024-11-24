import { Component, inject } from '@angular/core';
import { LoginService } from '../../Services/Login/login-service';
import { FreelancerProfileInforamtion } from '../../models/freelancer-profile-information';
import { FreelancerService } from '../../Services/Freelancer/freelancer.service';
import { CommonModule } from '@angular/common';
import { FreelancerRequestResult } from '../../models/freelancer-request-result';
import { OfferedServiceResult } from '../../models/offered-service-result';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatCheckboxModule, MatCardModule],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css'],
})
export class FreelancerProfileComponent {
  userId: string | null = null;
  freelancerProfileInfo: FreelancerProfileInforamtion | null = null;
  requests: FreelancerRequestResult[] = [];
  offeredServices: OfferedServiceResult[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  servicesPageIndex: number = 1;
  servicesPageSize: number = 6;
  servicesTotalPages: number = 0;

  private loginService = inject(LoginService);
  private freelancerService = inject(FreelancerService);
  private _freelancerService = inject(FreelancerService);
  private dialog = inject(MatDialog);
  private _router = inject(Router);

  isLoggedIn: boolean = false;

  freelancerId: string | null = null;

  constructor(private ActivatedRoute: ActivatedRoute) {
    this.isLoggedIn = this.loginService.isLoggedin();
  }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      this.freelancerId = params.get('freelancerId');
      if (this.freelancerId) {
        this.getFreelancerInfo(this.freelancerId);
      } else {
        this.getFreelancerInfo();
      }
    });
  }

  getFreelancerInfo(freelancerId?: string): void {
    this.freelancerService.getFreelancer(freelancerId).subscribe(
      (response) => {
        this.freelancerProfileInfo = response.data;

        if (this.freelancerProfileInfo) {
          this.userId = this.freelancerProfileInfo.id;
          this.getFreelancerRequests();
          this.getFreelancerOfferedServices();
        } else {
          console.error('Freelancer profile information is not available.');
        }
      },
      (error) => {
        console.error('Error fetching freelancer details:', error);
      }
    );
  }

  getFreelancerRequests() {
    if (this.userId !== null) {
      this.freelancerService
        .getFreelancerRequests(this.pageIndex, this.pageSize)
        .subscribe(
          (response) => {
            this.requests = response.data;
            this.totalPages = response.data.totalPages;
          },
          (error) => {
            console.error('Error fetching requests details:', error);
          }
        );
    } else {
      console.error('User not found.');
    }
  }

  getFreelancerOfferedServices() {
    if (this.userId !== null) {
      this.freelancerService
        .getFreelancerOfferedServices(
          this.userId,
          this.servicesPageIndex,
          this.servicesPageSize
        )
        .subscribe(
          (response) => {
            this.offeredServices = response.data;
            this.servicesTotalPages = response.data.totalPages;
            console.log('Sercices : ', response.data);
          },
          (error) => {
            console.error('Error fetching Offered Services details:', error);
          }
        );
    } else {
      console.error('User not found.');
    }
  }

  acceptRequest(requestId: string) {
    this.freelancerService.acceptRequest(requestId).subscribe(
      (response) => {},
      (error) => {
        console.error('Error accepting request', error);
      }
    );
  }

  refuseRequest(requestId: string) {
    this.freelancerService.refuseRequest(requestId).subscribe(
      (response) => {},
      (error) => {
        console.error('Error refusing request', error);
      }
    );
  }

  onServicePageChange(newPageIndex: number): void {
    if (newPageIndex > 0 && newPageIndex <= this.servicesTotalPages) {
      this.servicesPageIndex = newPageIndex;
      this.getFreelancerOfferedServices();
    }
  }

  onPageChange(newPageIndex: number): void {
    if (newPageIndex > 0 && newPageIndex <= this.totalPages) {
      this.pageIndex = newPageIndex;
      this.getFreelancerRequests();
    }
  }

  DeleteFreelancerBusiness() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete your business? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._freelancerService.deleteFreelancerBusiness().subscribe({
          next: (response) => {
            console.log('Business deleted successfully:', response);
            this.openAlertDialog(
              'Success',
              'Your business has been deleted successfully'
            );
            setTimeout(() => {
              this._router.navigateByUrl('/home');
            }, 3000);
          },
          error: (err) => {
            console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to delete your business');
          },
        });
      } else {
        // console.log("Deletion canceled by the user.");
      }
    });
  }

  EditFreelancerBusiness() {
    this._router.navigateByUrl('/updateFreelancerBusiness');
    
  }

  sendServiceRequest() {
    this._router.navigateByUrl(`/SendServiceRequest/${this.freelancerId}`);
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
