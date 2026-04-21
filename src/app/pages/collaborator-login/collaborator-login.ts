import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Domain/Services/UsersServices';

@Component({
  standalone: true,
  selector: 'app-collaborator-login',
  templateUrl: './collaborator-login.html',
  imports: [RouterLink, FormsModule, CommonModule],
})
export class CollaboratorLogin {
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    const user = this.userService.users.find(
      (u) => u.email === this.email && u.password === this.password
    );

    if (user) {
      if (!user.enable) {
        alert('Tu cuenta está deshabilitada. Contacta al administrador.');
        return;
      }
      this.userService.setCurrentUser(user);
      alert(`¡Bienvenido, ${user.name}!`);
      this.router.navigate(['/form-inscription-workshops']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
