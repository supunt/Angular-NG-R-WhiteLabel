import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GoolgPlacePrediction } from '../shared/export';

@Component({
  selector: 'app-address-search-bubble',
  templateUrl: './address-search-bubble.component.html',
  styleUrls: ['./address-search-bubble.component.scss']
})
export class AddressSearchBubbleComponent implements OnInit {

  searchBubbleHidden = true;
  @Output() addressPredSelected: EventEmitter<GoolgPlacePrediction> = new EventEmitter<GoolgPlacePrediction>();
  constructor() { }

  ngOnInit() {
  }

}
