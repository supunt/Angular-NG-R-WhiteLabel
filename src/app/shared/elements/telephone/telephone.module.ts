import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelephoneComponent } from './telephone.component';
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
  declarations: [TelephoneComponent],
  exports: [TelephoneComponent]
})
export class TelephoneModule { }
