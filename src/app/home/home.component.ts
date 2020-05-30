import { Component, OnInit, ViewChild } from '@angular/core';
import { LatLong, GoogleMapMarker, Property, User,
         GoolgPlacePrediction, Guid, AddressSearchModalService, GoogleMapStateService } from '../shared/export';
import { ComponentBase } from '../shared/classes/exports';
import { AddressInfoModalService } from '../address-info-modal/address-info-modal.service';
import { IconColorService } from '../shared/services/icon-color.service';
import { GoogleMapComponent } from '../shared/components/google-map/google-map.component';
import { AddressSearchComponent } from '../shared/components/address-search/address-search.component';
import { UserService } from '../shared/services/user.service';


declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase implements OnInit {

  @ViewChild('theMap', {static : false}) map: GoogleMapComponent;
  @ViewChild('addressSearch', {static : false}) addressSerch: AddressSearchComponent;

  constructor(
    private searchSvc: AddressSearchModalService,
    private mapStateSvc: GoogleMapStateService,
    private userSvc: UserService,
    private addressInfoSvc: AddressInfoModalService,
    private icolorSvc: IconColorService) {
    super();
  }

  pin: GoogleMapMarker = null;
  activeAddressList: Property[] = [];
  private mapReady = false;
  private markersPushed = false;

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.rxs(this.mapStateSvc.$mapState.subscribe(
      (state) =>  {
        this.mapReady = true;
        this.addressSerch.mapReady();
        if (!this.markersPushed) {
          this.map.SetUserMarkers(this.activeAddressList);
          this.activeAddressList.forEach(x => this.userSvc.addLocation(x, true));
          this.markersPushed = true;
        }
      }));

    this.rxs(this.userSvc.$loggedInUser.subscribe(
      (data: User) =>  {

        if (data == null) {
          return;
        }

        this.rxs(this.userSvc.getMyLocations().subscribe(
          (userLocations: Property[]) => {
            this.activeAddressList = userLocations;
            if (this.map != null && this.mapReady) {
              if (!this.markersPushed) {
                this.activeAddressList.forEach(x => this.userSvc.addLocation(x, true));
                this.map.SetUserMarkers(this.activeAddressList);
                this.markersPushed = true;
              }
            }
          }
        ));
      }
    ));
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnPinDrop(pin: GoogleMapMarker) {
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnPinSelected(pin: Property) {
    const activeAddress = this.activeAddressList.filter(x => x.uuid === pin.uuid);

    if (activeAddress != null && activeAddress.length === 1) {
      pin.propertyType = activeAddress[0].propertyType;
      pin.propertyState = activeAddress[0].propertyState;
      pin.uuid = activeAddress[0].uuid;
    }

    this.addressInfoSvc.Open(
      (saveMarker) => {
        saveMarker.saved = true;
        saveMarker.draggable = false;
        this.SaveMarker(saveMarker);
      },
      (deleteMarker) => {
        this.userSvc.removeLocation(deleteMarker);
        this.map.DeleteMarker(deleteMarker);
      }, pin);
  }

  // -------------------------------------------------------------------------------------------------------------------
  SaveMarker(pin: Property) {
    const locAddr = new Property();
    locAddr.uuid = pin.uuid;
    locAddr.label = pin.label;
    locAddr.draggable = pin.draggable;
    locAddr.address = pin.address;
    locAddr.saved = pin.saved;
    locAddr.lat = pin.lat;
    locAddr.lng = pin.lng;
    locAddr.propertyType = pin.propertyType;
    locAddr.propertyState = pin.propertyState;
    locAddr.saved = pin.saved;
    console.log('Saving marker', locAddr);
    this.userSvc.addLocation(locAddr);
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnDeleteMarker(pin: Property) {
    console.log('Deleting marker', pin);
    this.userSvc.removeLocation(pin);
  }


  // -------------------------------------------------------------------------------------------------------------------
  OnAddressPrediction(address: GoolgPlacePrediction) {
    const placeDetailSvc = new google.maps.places.PlacesService(document.createElement('div'));
    placeDetailSvc.getDetails({placeId : address.place_id}, (data, status) => {
      console.log('Place details', data);
      const newMarker: GoogleMapMarker = {
        address: address.description,
        draggable: true,
        lat: data.geometry.location.lat(),
        lng: data.geometry.location.lng(),
        uuid: Guid.newGuid(),
        saved: false,
        iconColor: this.icolorSvc.getUserIconColor(),
        label: 'New Location'
      };

      console.log('Adding new marker by search', newMarker);
      this.map.markers.push(newMarker);
      this.map.FocusMarker(newMarker);
    });
  }
}
