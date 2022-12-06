import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  login(email: string, password: string): void {
    this.authService.login(email, password);
    const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
    this.router.navigate([redirectUrl]);
  }

}
