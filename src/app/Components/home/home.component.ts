import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HomeService } from '../../Services/Home/home.service';
import { RouterLink } from '@angular/router';
import { FreelancersResult } from '../../models/freelancers-result';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  freelancers: FreelancersResult[] = [];
  search: string = '';
  pageIndex: number = 1;
  pageSize: number = 1;
  totalPages: number = 0;
  private homeService = inject(HomeService);

  ngOnInit(): void {
    this.loadFreelancers();
  }

  loadFreelancers(): void {
    this.homeService.paginatedFilteredFreelancers(this.pageIndex, this.search, this.pageSize).subscribe(
      response => {
        this.freelancers = response.data.data;
        this.totalPages = Math.ceil(response.data.totalPages / this.pageSize);
        console.log('Freelancers:', this.freelancers);
      },
      error => {
        console.error('Error fetching freelancers:', error.message);
      }
    );
  }
  
  onSearchChange(event: any): void {
    const searchValue = event.target.value;
    this.search = searchValue;
    this.pageIndex = 1; 
    this.loadFreelancers(); 
  }

  onPageChange(newPageIndex: number): void {
    if (newPageIndex > 0 && newPageIndex <= this.totalPages) {
      this.pageIndex = newPageIndex;
      this.loadFreelancers();
    }
  }
  
}
