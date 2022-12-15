import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorDirective } from './custom-validator.directive';
import { ShortenPipe } from './pipes/shorten.pipe';
import { BetterDatePipe } from './pipes/better-date.pipe';



@NgModule({
  declarations: [
    CustomValidatorDirective,
    ShortenPipe,
    BetterDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomValidatorDirective,
    ShortenPipe,
    BetterDatePipe
  ]
})
export class SharedModule { }
