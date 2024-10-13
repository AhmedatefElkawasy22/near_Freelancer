import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
<<<<<<< HEAD
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
=======
import { MatSnackBarModule } from '@angular/material/snack-bar';
>>>>>>> 3b618e7bd9479d6ddcb145d1ca7f908f0c73d783

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet],
=======
  imports: [RouterOutlet, LoginComponent , MatSnackBarModule],
>>>>>>> 3b618e7bd9479d6ddcb145d1ca7f908f0c73d783
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NearFreelancer';
}
