import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../../Services/Login/login-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  roles: string[] = [];
  isLoggedIn: boolean = false;
  isFreelancer: boolean = false;

  private loginService = inject(LoginService);

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isTokenValid();
    this.loadRoles();
  }

  loadRoles(): void {
    this.loginService.getUserRoles().subscribe(
      (response) => {
        this.roles = response.data;
        console.log('Roles:', this.roles);
        this.isFreelancer = this.roles.includes('Freelancer');
      },
      (error) => {
        console.error('Error fetching roles:', error.message);
      }
    );
  }

  LogOut() {
    this.loginService.logout();
  }
}
