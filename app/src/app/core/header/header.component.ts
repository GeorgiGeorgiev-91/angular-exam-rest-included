import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

  get personName(): string {
    return this.authService.user?.personName || '';
  }

  constructor(private authService: AuthService) { }



}
