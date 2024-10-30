import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null); // Inicialmente, ningún usuario
  currentUser$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }

  isUserLoggedIn() {
    return this.userSubject.value !== null;
  }

  getUserType() {
    return this.userSubject.value ? this.userSubject.value.userType : null;
  }
}