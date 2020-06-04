import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AddressListModule } from '../address-list/address-list.module';
import { UserWelcomeModule } from '../user-welcome/user-welcome.module';
import { AddressInfoModalComponent } from '../address-info-modal/address-info-modal.component';
import { AddressInfoModalModule } from '../address-info-modal/address-info-modal.module';
import { SharedModule } from '../shared/shared.module';
import { AddressSearchComponent } from '../shared/components/address-search/address-search.component';
import { AddressSearchBubbleComponent } from '../address-search-bubble/address-search-bubble.component';
import { AddressSearchBubbleModule } from '../address-search-bubble/address-search-bubble.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddressListModule,
    AddressSearchBubbleModule,
    UserWelcomeModule,
    AddressInfoModalModule
  ],
  exports : [HomeComponent],
  entryComponents: [AddressSearchComponent, AddressInfoModalComponent, AddressSearchBubbleComponent]
})
export class HomeModule { }
