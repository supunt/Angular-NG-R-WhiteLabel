import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AtElementsModule } from '../shared/elements/modules';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AtElementsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports : [LoginComponent]
})
export class LoginModule { }
