import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
