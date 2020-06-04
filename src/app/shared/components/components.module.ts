import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapModule } from './google-map/google-map.module';
import { AddressSearchModule } from './address-search/address-search.module';
import { LoaderModule } from './loader/loader.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [GoogleMapModule, AddressSearchModule, LoaderModule]
})
export class ComponentsModule { }
