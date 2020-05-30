import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInfoModalComponent } from './address-info-modal.component';
import { AtElementsModule } from '../shared/elements/modules';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddressInfoModalComponent],
  imports: [
    CommonModule,
    AtElementsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [AddressInfoModalComponent],
  entryComponents: [AddressInfoModalComponent]
})
export class AddressInfoModalModule { }
