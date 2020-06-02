import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User, Property, GoogleMapMarker } from '../shared/export';
import { AddressInfoModalService } from '../address-info-modal/address-info-modal.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  @Input() myLocations: Property[] = null;
  @Output() addressClicked: EventEmitter<GoogleMapMarker> = new EventEmitter<GoogleMapMarker>();

  // -------------------------------------------------------------------------------------------------------------------
  constructor(private infoSvc: AddressInfoModalService) {

  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
  }

  // -------------------------------------------------------------------------------------------------------------------
  focussAddress(mapLoc: GoogleMapMarker) {
    this.addressClicked.emit(mapLoc);
  }

  // -------------------------------------------------------------------------------------------------------------------
  OpenInfoWindow(item) {
    this.infoSvc.Open(() => {}, () => {}, item, false);
  }
}
