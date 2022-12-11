import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorage } from '../core/injection-tokens';
import { IUser } from '../shared/interfaces';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {

  }

  login(data: { email: string, password: string }) {
    return this.http.post<IUser>(`${apiURL}/login`, data, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    )
  }

  register(data: {
    email: string;
    password: string;
    rePassword: string;
    personName: string;
    sex: string;
  }) {
    return this.http.post<IUser>(`${apiURL}/register`, data, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    );
  }

  getProfileInfo() {
    return this.http.get<IUser>(`${apiURL}/users/profile`, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    )
  }

  logout() {
    return this.http.post<IUser>(`${apiURL}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.user = null)
    );
  }

  updateProfile(data: {
    email: string;
    password: string;
    rePassword: string;
    personName: string;
    sex: string;
  }){
    return this.http.post<IUser>(`${apiURL}/users/profile`, {}, { withCredentials: true }).pipe(
      tap(() => this.user = null)
    );
  }
}
