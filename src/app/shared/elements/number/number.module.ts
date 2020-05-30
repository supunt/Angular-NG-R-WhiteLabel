import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberComponent } from './number.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputStatusModule } from '../../directives/input-status/input-status.module';
import { FocusDirectiveModule } from '../../directives/focus/focus.module';
import { ErrorModule } from '../error/error.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorModule,
    InputStatusModule,
    FocusDirectiveModule
  ],
  declarations: [NumberComponent],
  exports: [NumberComponent]
})
export class NumberModule { }
