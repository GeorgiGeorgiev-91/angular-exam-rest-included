import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorDirective } from './custom-validator.directive';
import { ShortenPipe } from './pipes/shorten.pipe';
import { BetterDatePipe } from './pipes/better-date.pipe';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    CustomValidatorDirective,
    ShortenPipe,
    BetterDatePipe,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    CustomValidatorDirective,
    ShortenPipe,
    BetterDatePipe
  ]
})
export class SharedModule { }
