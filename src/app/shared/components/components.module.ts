import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapModule } from './google-map/google-map.module';
import { AddressSearchModule } from './address-search/address-search.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [GoogleMapModule, AddressSearchModule]
})
export class ComponentsModule { }
