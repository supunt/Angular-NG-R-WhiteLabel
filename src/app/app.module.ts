import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressListModule } from './address-list/address-list.module';
import { SharedModule } from './shared/shared.module';
import { DatepickerParserFormatter, DatepickerAdapter, TimepickerAdapter } from './shared/elements/exports';
import { NgbDateAdapter, NgbTimeAdapter, NgbDateParserFormatter, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { AdminHomeModule } from './admin-home/admin-home.module';
import { AgentListModule } from './agent-list/agent-list.module';
import { JwtInterceptor } from './shared/export';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddressListModule,
    HomeModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    AdminHomeModule,
    AgentListModule
  ],
  providers: [
    {
     provide: NgbDateAdapter, useClass: DatepickerAdapter
    },
    {
      provide: NgbDateParserFormatter, useClass: DatepickerParserFormatter
    },
    {
      provide: NgbTimeAdapter, useClass: TimepickerAdapter
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
