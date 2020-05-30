import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
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
  declarations: [RadioComponent],
  exports: [RadioComponent]
})
export class RadioModule { }
