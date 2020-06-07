import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserWelcomeComponent } from './user-welcome.component';



@NgModule({
  declarations: [UserWelcomeComponent],
  imports: [
    CommonModule
  ],
  exports: [UserWelcomeComponent]
})
export class UserWelcomeModule { }
