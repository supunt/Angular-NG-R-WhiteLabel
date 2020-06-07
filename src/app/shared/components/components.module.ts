import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapModule } from './google-map/google-map.module';
import { AddressSearchModule } from './address-search/address-search.module';
import { LoaderModule } from './loader/loader.module';
import { UserWelcomeModule } from './user-welcome/user-welcome.module';
import { AddressSearchBubbleModule } from './address-search-bubble/address-search-bubble.module';
import { AddressListModule } from './address-list/address-list.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    GoogleMapModule,
    AddressSearchModule,
    LoaderModule,
    UserWelcomeModule,
    AddressSearchBubbleModule,
    AddressListModule
]
})
export class ComponentsModule { }
