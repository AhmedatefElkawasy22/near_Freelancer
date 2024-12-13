import { Component, signal, effect, inject, OnInit, Injector } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../Services/Login/login-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  roles = signal<string[]>([]);
  isLoggedIn = false; 
  private loginService = inject(LoginService);
  injector: Injector = inject(Injector);
  private _router = inject(Router);


  ngOnInit(): void {
    effect(() => {
      this.isLoggedIn = this.loginService.isLoggedin();
    },
    {
      injector:this.injector
    });
    this.loadRoles();

     
  }

  loadRoles(): void {
    this.loginService.getUserRoles().subscribe(
      (response) => {
        this.roles.set(response.data); 
        console.log('Roles:', response.data);
      },
      (error) => {
        console.error('Error fetching roles:', error.message);
      }
    );
  }

  LogOut(): void {
    this.loginService.logout();
    this._router.navigate(['/login']);
  }
}
