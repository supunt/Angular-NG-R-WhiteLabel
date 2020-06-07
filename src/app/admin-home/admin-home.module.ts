import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home.component';
import { AddressListModule } from '../shared/components/address-list/address-list.module';
import { SharedModule } from '../shared/shared.module';
import { UserListModule } from './user-list/user-list.module';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddressListModule,
    UserListModule
  ],
  exports: [AdminHomeComponent]
})
export class AdminHomeModule { }
