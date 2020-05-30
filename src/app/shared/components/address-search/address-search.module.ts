import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressSearchComponent } from './address-search.component';
import { AtElementsModule } from '../../elements/modules';


@NgModule({
  declarations: [AddressSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtElementsModule
  ],
  exports: [AddressSearchComponent]
})
export class AddressSearchModule { }
