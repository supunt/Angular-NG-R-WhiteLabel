import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressListComponent } from './address-list.component';



@NgModule({
  declarations: [AddressListComponent],
  imports: [
    CommonModule
  ],
  exports: [AddressListComponent]
})
export class AddressListModule { }
