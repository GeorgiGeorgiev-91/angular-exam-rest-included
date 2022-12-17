import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, filter, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
  user$ = this.user$$.asObservable().pipe(filter(val => val !== undefined));

  user: IUser | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe(user => {
      this.user = user;
    })
  }


  login(data: { email: string, password: string }) {
    return this.http.post<IUser>(`/api/login`, data).pipe(
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
    return this.http.post<IUser>(`/api/register`, data).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  getProfileInfo() {
    return this.http.get<IUser>(`/api/users/profile`).pipe(
      tap((user) => this.user$$.next(user))
    )
  }

  getProfile() {
    return this.http.get<IUser>(`/api/users/profile`);
  }

  logout() {
    return this.http.post<IUser>(`/api/logout`, {}).pipe(
      tap(() => this.user$$.next(null))
    );
  }

  updateProfile(data: {
    email: string;
    personName: string;
    sex: string;
  }) {
    return this.http.put<IUser>(`/api/users/profile`, data).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
