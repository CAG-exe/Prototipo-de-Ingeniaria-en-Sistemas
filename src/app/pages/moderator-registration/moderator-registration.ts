import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Domain/Services/UsersServices';

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
  
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  login() {
    const user = this.userService.users.find(
      (u) => u.name === this.name && u.email === this.email && u.password === this.password
    );

    if (user) {
      this.userService.setCurrentUser(user);
      this.router.navigate(['/users-manager']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
