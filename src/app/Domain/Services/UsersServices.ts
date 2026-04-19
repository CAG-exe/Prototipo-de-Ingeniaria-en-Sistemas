import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITallerCultural } from '../Interfaces/ITallerCultural';
import { IUser } from '../Interfaces/IUser';
import { USERS_MOCK } from '../../Data/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<IUser[]>(USERS_MOCK);
  users$ = this.usersSubject.asObservable();

  constructor() {}

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
