import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { RecipeModule } from './recipe/recipe.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthRoutingModule,
    RecipeModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
