import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailValidator = emailValidator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  login(form: NgForm): void {
    if (form.invalid) { return; }
    const { email, password } = form.value;
    this.authService.login({ email, password }).subscribe({
      next: () => {
        const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
        this.router.navigate([redirectUrl]);
      },
        error: (err) => {
          console.log(err);
        }
    });
  }

}
