import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInfoModalComponent } from './address-info-modal.component';
import { AtElementsModule } from '../../elements/modules';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressSearchModule } from '../address-search/address-search.module';



@NgModule({
  declarations: [AddressInfoModalComponent],
  imports: [
    CommonModule,
    AtElementsModule,
    ReactiveFormsModule,
    AddressSearchModule
  ],
  exports: [AddressInfoModalComponent],
  entryComponents: [AddressInfoModalComponent]
})
export class AddressInfoModalModule { }
