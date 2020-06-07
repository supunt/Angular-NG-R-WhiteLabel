import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DatepickerParserFormatter, DatepickerAdapter, TimepickerAdapter } from './shared/elements/exports';
import { NgbDateAdapter, NgbTimeAdapter, NgbDateParserFormatter, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { AdminHomeModule } from './admin-home/admin-home.module';
import { JwtInterceptor } from './shared/export';
import { StoreModule } from '@ngrx/store';
import { UserPropertyReducer } from './shared/reducers/user-properties.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserPropertiesEffects } from './shared/effects/user-properties.effects';
import { UserReducer } from './shared/reducers/users.reducer';
import { UserEffects } from './shared/effects/user.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    AdminHomeModule,
    StoreModule.forRoot({ userProperties: UserPropertyReducer, users: UserReducer }),
    EffectsModule.forRoot([UserPropertiesEffects, UserEffects])
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
