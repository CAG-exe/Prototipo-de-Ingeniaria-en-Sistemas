import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITallerCultural } from '../Interfaces/ITallerCultural';
import { IUser } from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {
    this.loadUsers();
  }

  private async loadUsers() {
    try {
      const response = await fetch('/users.json');
      const data = await response.json();
      this.usersSubject.next(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  get users(): IUser[] {
    return this.usersSubject.value;
  }

  setUsers(users: IUser[]) {
    this.usersSubject.next(users);
  }

  addUser(user: IUser) {
    const actuales = this.usersSubject.value;
    this.usersSubject.next([...actuales, user]);
  }

  toggleUserStatus(id: number) {
    const actuales = this.usersSubject.value;
    const actualizados = actuales.map((w) =>
      w.id === id ? { ...w, enable: !w.enable } : w,
    );
    this.usersSubject.next(actualizados);
  }
}
