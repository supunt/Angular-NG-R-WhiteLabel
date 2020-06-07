import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AddressListModule } from '../shared/components/address-list/address-list.module';
import { SharedModule } from '../shared/shared.module';
import { AddressSearchComponent } from '../shared/components/address-search/address-search.component';
import { AddressSearchBubbleComponent } from '../shared/components/address-search-bubble/address-search-bubble.component';
import { AddressSearchBubbleModule } from '../shared/components/address-search-bubble/address-search-bubble.module';
import { AddressInfoModalModule } from '../shared/components/address-info-modal/address-info-modal.module';
import { AddressInfoModalComponent } from '../shared/components/address-info-modal/address-info-modal.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddressListModule,
    AddressSearchBubbleModule,
    AddressInfoModalModule
  ],
  exports : [HomeComponent],
  entryComponents: [AddressSearchComponent, AddressInfoModalComponent, AddressSearchBubbleComponent]
})
export class HomeModule { }
