import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home.component';
import { AgentListModule } from '../agent-list/agent-list.module';
import { UserWelcomeModule } from '../user-welcome/user-welcome.module';
import { AddressListModule } from '../address-list/address-list.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    AgentListModule,
    SharedModule,
    UserWelcomeModule,
    AddressListModule
  ],
  exports: [AdminHomeComponent]
})
export class AdminHomeModule { }
