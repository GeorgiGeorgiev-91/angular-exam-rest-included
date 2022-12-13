import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  inUpdateMode = false;

  get user() {
    return this.authService.user;
  }

  constructor(private authService: AuthService) { }

  updateProfile(form: NgForm): void {
    if (form.invalid) { return; }
    this.authService.updateProfile(form.value).subscribe({
      next: () => {
          this.inUpdateMode = false;
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

}
