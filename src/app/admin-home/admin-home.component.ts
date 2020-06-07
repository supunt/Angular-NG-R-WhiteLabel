import { Component, OnInit, ViewChild } from '@angular/core';
import { User, Property, GoogleMapMarker, AddressInfoModalService } from '../shared/export';
import { LoginService } from '../shared/services/login.service';
import { ComponentBase } from '../shared/classes/exports';
import { GoogleMapComponent } from '../shared/components/google-map/google-map.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent extends ComponentBase implements OnInit {

  @ViewChild('theMap', { static : false }) mapRef: GoogleMapComponent;
  selectedAgent: User = null;
  selectedAgentLocations: Property[] = [];

  constructor(private loginSvc: LoginService, private addressInfoSvc: AddressInfoModalService) {
    super();
  }

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
    this.rxs(this.loginSvc.getAgentLocations(user.userName).subscribe(
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
  OnPinDrop(pin: GoogleMapMarker) {
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnDeleteMarker(pin: Property) {
    console.log('Deleting marker', pin);
    // this.store.dispatch(UserPropertyAction.BeginRemovePropertyAction({ payload: pin }));
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnPinSelected(item: Property) {
    this.addressInfoSvc.Open(
      (saveMarker) => {
      },
      (deleteMarker) => {
        this.rxs(this.loginSvc.removeLocationByAdmin(deleteMarker, this.selectedAgent.userName).subscribe(
          success => this.loadAgentLocations(this.selectedAgent),
          err => this.loadAgentLocations(this.selectedAgent)
        ));
      }, item, false);
  }
}
