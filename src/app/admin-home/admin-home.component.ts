import { Component, OnInit, ViewChild } from '@angular/core';
import { User, Property, GoogleMapMarker, AddressInfoModalService } from '../shared/export';
import { LoginService } from '../shared/services/login.service';
import { ComponentBase } from '../shared/classes/exports';
import { GoogleMapComponent } from '../shared/components/google-map/google-map.component';
import * as AdminUserPropertyAction from '../shared/actions/admin-user-properties.action';
import AdminUserPropertiesState from '../shared/state/admin-user-properties.state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent extends ComponentBase implements OnInit {

  @ViewChild('theMap', { static : false }) mapRef: GoogleMapComponent;
  selectedAgentLocations: Property[] = [];
  allAgentProperties$: Observable<AdminUserPropertiesState>;
  selectedAgentId = '';

  constructor(
    private loginSvc: LoginService,
    private addressInfoSvc: AddressInfoModalService,
    private store: Store<{ adminUserProperties: AdminUserPropertiesState }>) {
    super();
    this.allAgentProperties$ = this.store.pipe(select('adminUserProperties'));
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.selectedAgentId = localStorage.getItem('loggedinUser');
    this.rxs(this.allAgentProperties$.subscribe(
      data => {
        this.selectedAgentLocations = [];
        if (data.userProperties[this.selectedAgentId] != null) {
          this.selectedAgentLocations = data.userProperties[this.selectedAgentId];
        }
      },
      err => {
        this.selectedAgentLocations = [];
      }
    ));

    this.store.dispatch(AdminUserPropertyAction.BeginGetPropertiesOfUserAction( {userId: this.selectedAgentId}));
  }

  // -------------------------------------------------------------------------------------------------------------------
  agentSelected(user: User) {
    this.selectedAgentId = user.userName;
    this.store.dispatch(AdminUserPropertyAction.BeginGetPropertiesOfUserAction( {userId: this.selectedAgentId}));
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
    this.store.dispatch(AdminUserPropertyAction.BeginRemovePropertyOfUserAction(
      { payload: pin, userId: this.selectedAgentId }));
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnPinSelected(item: Property) {
    // this.addressInfoSvc.Open(
    //   (saveMarker) => {
    //   },
    //   (deleteMarker) => {
    //     this.rxs(this.loginSvc.removeLocationByAdmin(deleteMarker, this.selectedAgent.userName).subscribe(
    //       success => this.loadAgentLocations(this.selectedAgent),
    //       err => this.loadAgentLocations(this.selectedAgent)
    //     ));
    //   }, item, false);
  }
}
