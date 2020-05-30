import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputStatusDirective } from './input-status.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputStatusDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputStatusDirective
  ]
})
export class InputStatusModule { }
