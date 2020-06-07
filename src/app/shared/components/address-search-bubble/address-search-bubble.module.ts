import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressSearchBubbleComponent } from './address-search-bubble.component';
import { AddressSearchModule } from '../address-search/address-search.module';



@NgModule({
  declarations: [AddressSearchBubbleComponent],
  imports: [
    CommonModule,
    AddressSearchModule
  ],
  exports : [AddressSearchBubbleComponent]
})
export class AddressSearchBubbleModule { }
