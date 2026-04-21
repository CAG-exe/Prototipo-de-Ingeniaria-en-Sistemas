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

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

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

  setCurrentUser(user: IUser | null) {
    this.currentUserSubject.next(user);
  }

  get currentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  addUser(user: IUser) {
    const actuales = this.usersSubject.value;
    this.usersSubject.next([...actuales, user]);
  }

  addWorkshopToCurrentUser(workshopId: number) {
    const user = this.currentUser;
    if (user) {
      const updatedUser = {
        ...user,
        workshops: [...(user.workshops || []), workshopId],
      };
      this.setCurrentUser(updatedUser);

      // Actualizar en el subject general para que se vea en el Dashboard
      const actuales = this.usersSubject.value;
      const actualizados = actuales.map((u) =>
        u.id === user.id ? updatedUser : u,
      );
      this.usersSubject.next(actualizados);
    }
  }

  toggleUserStatus(id: number) {
    const actuales = this.usersSubject.value;
    const actualizados = actuales.map((u) =>
      u.id === id ? { ...u, enable: !u.enable } : u,
    );
    this.usersSubject.next(actualizados);
  }
}
