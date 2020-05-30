import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerComponent } from './timepicker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from '../error/error.module';
import { InputStatusModule } from '../../directives/input-status/input-status.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FocusDirectiveModule } from '../../directives/focus/focus.module';



@NgModule({
  declarations: [TimepickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorModule,
    InputStatusModule,
    NgbModule,
    FocusDirectiveModule
  ],
  exports: [TimepickerComponent]
})
export class TimepickerModule { }
