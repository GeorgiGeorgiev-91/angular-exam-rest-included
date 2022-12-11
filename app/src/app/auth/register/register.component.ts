import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { emailValidator, sameValueAsFactory } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  killSubscription = new Subject();

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePassword: ['', [Validators.required, sameValueAsFactory(
        () => this.form?.get('password'),
        this.killSubscription
      )]],
      personName: ['', [Validators.required, Validators.minLength(3)]],
      sex: [''],
    })
  }

  ngOnDestroy(): void {
    this.killSubscription.next(null);
    this.killSubscription.complete();
  }

  register(): void {
    if (this.form.invalid) { return; }
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    console.log(this.form.value);
  }
}
