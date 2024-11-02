import { Component, inject } from '@angular/core';
import { LoginService } from '../../Services/Login/login-service';
import { FreelancerProfileInforamtion } from '../../models/freelancer-profile-information';
import { FreelancerService } from '../../Services/Freelancer/freelancer.service';
import { CommonModule } from '@angular/common';
import { FreelancerRequestResult } from '../../models/freelancer-request-result';
import { OfferedServiceResult } from '../../models/offered-service-result';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
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
  
  isLoggedIn: boolean = false;

  constructor() {
    this.isLoggedIn = this.loginService.isLoggedin();
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.getFreelancerInfo();
    } else {
      console.error('User is not logged in or token claims are not available.');
    }
  }

  getFreelancerInfo() {
    if (this.isLoggedIn) {
      this.freelancerService.getFreelancer().subscribe(
        response => {
          this.freelancerProfileInfo = response.data;

          if (this.freelancerProfileInfo) {
            this.userId = this.freelancerProfileInfo.id;
            this.getFreelancerRequests();
            this.getFreelancerOfferedServices();
          } else {
            console.error('Freelancer profile information is not available.');
          }
        },
        error => {
          console.error('Error fetching freelancer details:', error);
        }
      );
    } else {
      console.error('User ID is not available.');
    }
  }

  getFreelancerRequests() {
    if (this.userId !== null) {
      this.freelancerService.getFreelancerRequests(this.pageIndex, this.pageSize).subscribe(
        response => {
          this.requests = response.data ;
          this.totalPages = response.data.totalPages 
        },
        error => {
          console.error('Error fetching requests details:', error);
        }
      );
    } else {
      console.error('User not found.');
    }
  }

  getFreelancerOfferedServices() {
    if (this.userId !== null) {
      this.freelancerService.getFreelancerOfferedServices(this.userId, this.servicesPageIndex, this.servicesPageSize).subscribe(
        response => {
          this.offeredServices = response.data ;
          this.servicesTotalPages = response.data.totalPages ;
          console.log("Sercices : " ,response.data)
        },
        error => {
          console.error('Error fetching Offered Services details:', error);
        }
      );
    } else {
      console.error('User not found.');
    }
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
}
