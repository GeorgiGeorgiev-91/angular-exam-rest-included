import { Inject, Injectable } from '@angular/core';
import { LocalStorage } from '../core/injection-tokens';
import { IUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser | undefined;

  get isLogged(): boolean{
    return !!this.user;
  }

  constructor(@Inject(LocalStorage) private localStorage: Window['localStorage']) {
    try{
      const localStorage = this.localStorage.getItem('<USER>') || 'ERROR';
      this.user = JSON.parse(localStorage)
    } catch {
      this.user = undefined;
    }
  }

  login(email: string, password: string): void{
    this.user = {
      email,
      personName: 'test name'
    }
    this.localStorage.setItem('<USER>', JSON.stringify(this.user));
  }


  logout(): void{
    this.user = undefined;
    this.localStorage.removeItem('<USER>');
  };
}
