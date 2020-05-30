import { NgModule } from '@angular/core';
import { EmailModule } from './email/email.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { NumberModule } from './number/number.module';
import { PasswordModule } from './password/password.module';
import { RadioModule } from './radio/radio.module';
import { SelectModule } from './select/select.module';
import { TextboxModule } from './textbox/textbox.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { TelephoneModule } from './telephone/telephone.module';
import { CardNumberModule } from './card-number/card-number.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { TextAreaModule } from './text-area/text-area.module';
import { TimepickerModule } from './timepicker/timepicker.module';

@NgModule({
  exports: [
    CheckboxModule,
    EmailModule,
    NumberModule,
    PasswordModule,
    RadioModule,
    SelectModule,
    TextboxModule,
    DatepickerModule,
    TelephoneModule,
    CardNumberModule,
    DropdownModule,
    TextAreaModule,
    TimepickerModule
  ],
})
export class AtElementsModule { }
