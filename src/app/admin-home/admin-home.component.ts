import { Component, OnInit, ViewChild } from '@angular/core';
import { User, Property, GoogleMapMarker, cloneProperty } from '../shared/export';
import { UserService } from '../shared/services/user.service';
import { ComponentBase } from '../shared/classes/exports';
import { AgmMap } from '@agm/core';
import { AddressInfoModalService } from '../address-info-modal/address-info-modal.service';
import { GoogleMapComponent } from '../shared/components/google-map/google-map.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent extends ComponentBase implements OnInit {

  @ViewChild('theMap', { static : false }) mapRef: GoogleMapComponent;
  constructor(private userSvc: UserService, private addressInfoSvc: AddressInfoModalService) {
    super();
  }

  selectedAgent: User = null;
  selectedAgentLocations: Property[] = [];

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
  }

  // -------------------------------------------------------------------------------------------------------------------
  agentSelected(user: User) {
    this.selectedAgent = user;
    this.loadAgentLocations(user);
  }

  // -------------------------------------------------------------------------------------------------------------------
  loadAgentLocations(user: User) {
    this.rxs(this.userSvc.getAgentLocations(user.userName).subscribe(
      (data: Property[]) =>  {
        this.selectedAgentLocations = data;
        this.mapRef.SetUserMarkers(this.selectedAgentLocations, false);
      },
      err => this.selectedAgentLocations = []
    ));
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnAddressClicked(marker: Property) {
    this.mapRef.FocusMarker(marker);
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnPinSelected(item: Property) {
    let editableItem = cloneProperty(item);
    this.addressInfoSvc.Open(
      (saveMarker) => {
      },
      (deleteMarker) => {
        this.rxs(this.userSvc.removeLocationByAdmin(deleteMarker, this.selectedAgent.userName).subscribe(
          success => this.loadAgentLocations(this.selectedAgent),
          err => this.loadAgentLocations(this.selectedAgent)
        ));
      }, editableItem, false);
  }
}
