import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AddressListModule } from '../address-list/address-list.module';
import { UserWelcomeModule } from '../user-welcome/user-welcome.module';
import { AddressInfoModalComponent } from '../address-info-modal/address-info-modal.component';
import { AddressInfoModalModule } from '../address-info-modal/address-info-modal.module';
import { SharedModule } from '../shared/shared.module';
import { AddressSearchComponent } from '../shared/components/address-search/address-search.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddressListModule,
    UserWelcomeModule,
    AddressInfoModalModule
  ],
  exports : [HomeComponent],
  entryComponents: [AddressSearchComponent, AddressInfoModalComponent]
})
export class HomeModule { }
