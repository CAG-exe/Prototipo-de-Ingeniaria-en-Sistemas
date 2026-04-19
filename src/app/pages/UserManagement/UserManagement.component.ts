import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IUser } from '../../Domain/Interfaces/IUser';
import { UserItemComponent } from './UserItem.component';
import { UserService } from '../../Domain/Services/UsersServices';

@Component({
  standalone: true,
  selector: 'app-user-management',
  templateUrl: './UserManagement.component.html',
  imports: [CommonModule, UserItemComponent, RouterLink],
})
export class UserManagementComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.users$.subscribe((users) => {
      this.users = users;
    });
  }

  trackById(index: number, item: IUser) {
    return item.id;
  }
}
