import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressSearchBubbleComponent } from './address-search-bubble.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddressSearchBubbleComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports : [AddressSearchBubbleComponent]
})
export class AddressSearchBubbleModule { }
