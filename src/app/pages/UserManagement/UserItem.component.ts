import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../Domain/Interfaces/IUser';
import { UserService } from '../../Domain/Services/UsersServices';

@Component({
  standalone: true,
  selector: 'app-user-item',
  templateUrl: './UserItem.component.html',
  imports: [CommonModule],
})
export class UserItemComponent implements OnInit {
  readonly user = input<IUser>();

  constructor(private userService: UserService) {}

  ngOnInit() {}

  toggleStatus() {
    const user = this.user();
    if (user) {
      this.userService.toggleUserStatus(user.id);
    }
  }
}
