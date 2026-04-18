import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moderator-registration',
  imports: [RouterLink, FormsModule],
  templateUrl: './moderator-registration.html',
  styleUrl: './moderator-registration.css',
})
export class ModeratorRegistration {

  name: string = '' ;
  email: string = '';
  password: string = '';
  
  nameModerator: string = 'Bruno' ;
  emailModerator: string = 'admin@admin.com';
  passwordModerator: string = 'admin1';

  constructor(private router: Router) {}

  login() {
    if (this.name === this.nameModerator && 
        this.email === this.emailModerator && 
        this.password === this.passwordModerator) {
      this.router.navigate(['/workshops-manager']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
