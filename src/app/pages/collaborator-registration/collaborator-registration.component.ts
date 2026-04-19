import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Domain/Services/UsersServices';
import { IUser } from '../../Domain/Interfaces/IUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collaborator-registration',
  standalone: true,
  templateUrl: './collaborator-registration.component.html',
  imports: [RouterLink, FormsModule, CommonModule],
})
export class CollaboratorRegistrationComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    if (!this.nombre || !this.email || !this.telefono) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const currentUsers = this.userService.users;
    const nextId = currentUsers.length > 0 ? Math.max(...currentUsers.map(u => u.id)) + 1 : 1;

    const newUser: IUser = {
      id: nextId,
      name: this.nombre,
      email: this.email,
      movil: this.telefono,
      password: this.password,
      enable: true,
      workshops: []
    };

    this.userService.addUser(newUser);
    alert('¡Registro de colaborador exitoso!');
    this.router.navigate(['/']);
  }
}
