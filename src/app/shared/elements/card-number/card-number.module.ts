import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardNumberComponent } from './card-number.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from '../error/error.module';
import { InputStatusModule } from '../../directives/input-status/input-status.module';
import { FocusDirectiveModule } from '../../directives/focus/focus.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorModule,
    InputStatusModule,
    FocusDirectiveModule
  ],
  declarations: [CardNumberComponent],
  exports: [CardNumberComponent]
})
export class CardNumberModule { }
