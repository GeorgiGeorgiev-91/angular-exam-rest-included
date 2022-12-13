import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  get isAuthenticating(): boolean {
    return this.authService.user === undefined;
  }

  constructor(
    private authService: AuthService
  ){
    this.authService.getProfileInfo().subscribe({
      error: () => {
        this.authService.user = null;
      }
    })
  }

}
