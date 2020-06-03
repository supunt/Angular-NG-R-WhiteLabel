import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { MouseEvent, AgmMap, LatLngBounds } from '@agm/core';
import { GoogleMapMarker, BrowserLocationService, Guid, LatLong, GoolgPlacePrediction } from '../../export';
import { GoogleMapStateService } from './map-state.service';
import { IconColorService } from '../../services/icon-color.service';
import { MapsDarkTheme } from './dark_theme';

declare var google: any;


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  zoom = 8;
  viewport: any;
  defaultMarker: GoogleMapMarker = null;
  markers: GoogleMapMarker[] = [];
  darkTheme = MapsDarkTheme;
  selectedMarker: GoogleMapMarker = null;

  @Input() pinDefaultMarker = true;
  @Output() pinDropped: EventEmitter<LatLong> = new EventEmitter<LatLong>();
  @Output() pinSelected: EventEmitter<GoogleMapMarker> = new EventEmitter<GoogleMapMarker>();
  @Output() pinRightClicked: EventEmitter<GoogleMapMarker> = new EventEmitter<GoogleMapMarker>();
  @ViewChild(AgmMap, {static : false}) map: AgmMap;
  @ViewChild(AgmMap, {static : false, read: ElementRef}) mapRef: ElementRef;

  constructor(private locSvc: BrowserLocationService,
              private mapStateSvc: GoogleMapStateService,
              private icolorSvc: IconColorService) { }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.CreateAndAddDefaultMarker();
  }

  // -------------------------------------------------------------------------------------------------------------------
  getDefaultMapCenter() {
    if (this.markers.length > 0) {
      return this.markers[0];
    } else {
      return this.defaultMarker;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  private CreateAndAddDefaultMarker() {
    this.locSvc.getPosition().then(
      loc =>  {
        this.defaultMarker = {
          lat: loc.lat,
          lng : loc.lng,
          draggable: true,
          uuid : Guid.newGuid(),
          saved: false,
          address: '',
          iconColor: 'red',
          label: 'You are here !'
        };

        if (this.pinDefaultMarker) {
          this.markers.push(this.defaultMarker);
        }
      }
    );
  }

  // -------------------------------------------------------------------------------------------------------------------
  mapDoubleClicked($event: MouseEvent) {
    const newMarker = {
      lat: $event.coords.lat,
      lng:  $event.coords.lng,
      draggable: true,
      uuid : Guid.newGuid(),
      saved: false,
      iconColor: this.icolorSvc.getUserIconColor(),
      label: 'Not Saved'
    };

    this.markers.push(newMarker);

    this.pinDropped.emit(newMarker);
  }

  // -------------------------------------------------------------------------------------------------------------------
  markerDragEnd(m: GoogleMapMarker, $event: MouseEvent) {
    console.log('Marker moved to', $event.coords);
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;

    this.pinDropped.emit(m);
  }

  // -------------------------------------------------------------------------------------------------------------------
  markerClicked(m: GoogleMapMarker, index: number) {
    if (m.uuid === this.defaultMarker.uuid) {
      this.selectedMarker = null;
      return;
    }

    this.selectedMarker = m;
    this.pinDropped.emit(m);
  }

  // -------------------------------------------------------------------------------------------------------------------
  markerSeleted(m: GoogleMapMarker) {
    if (m.uuid === this.defaultMarker.uuid) {
      return;
    }

    this.pinSelected.emit(m);
  }

  // -------------------------------------------------------------------------------------------------------------------

  markerRightClicked(m: GoogleMapMarker) {
    if (m.uuid === this.defaultMarker.uuid) {
      return;
    }

    this.pinRightClicked.emit(m);
  }
  // -------------------------------------------------------------------------------------------------------------------
  mouseOnMarker(m: GoogleMapMarker, $event: MouseEvent) {
    // this.hoveringMarker = m;
  }

  // -------------------------------------------------------------------------------------------------------------------
  onMapReady() {
    this.FocusMarker(this.markers[0]);
    this.mapStateSvc.setMapReady();
  }

  // -------------------------------------------------------------------------------------------------------------------
  FocusMarker(mkr: GoogleMapMarker) {
    const bounds: LatLngBounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(mkr.lat * 0.999965, mkr.lng * 0.99999));
    bounds.extend(new google.maps.LatLng(mkr.lat * 1.000035, mkr.lng * 1.00001));

    this.viewport = bounds;

    this.map.triggerResize(true);
  }

  // -------------------------------------------------------------------------------------------------------------------
  SetUserMarkers(markers: GoogleMapMarker[], append = true) {
    if (!append) {
      this.markers = this.markers.filter(x => x.uuid === this.defaultMarker.uuid);
    }
    for (const item of markers) {
      const existingMarker = this.markers.find(x => x.uuid === item.uuid);
      if (existingMarker == null) {
        this.markers.push(item);
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  DeleteMarker(m: GoogleMapMarker) {
    let index = -1;
    let idx = 0;

    if (m === this.defaultMarker) {
      return;
    }

    for (const item of this.markers) {
      if (item.uuid === m.uuid) {
        index = idx;
        break;
      }
      idx += 1;
    }
    if (index !== -1) {
      this.markers.splice(index, 1);
    }
  }

   // ------------------------------------------------------------------------------------------------------------------
   // Here if you want you can move the marker to new location
   // ------------------------------------------------------------------------------------------------------------------
  NearbyAddressSelected(object: GoogleMapMarker) {
    console.log('Moving Marker', object);

    let theMarker: GoogleMapMarker = null;
    for (const item of this.markers) {
        if (item.uuid === object.uuid) {
          theMarker = item;
          break;
        }
    }
    if (theMarker != null && !theMarker.saved) {
      theMarker.lat = object.lat;
      theMarker.lng = object.lng;
      theMarker.address = object.address;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  getIconUri(m: GoogleMapMarker) {
    if (this.selectedMarker != null && m.uuid == this.selectedMarker.uuid) {
      return `/assets/icons/marker_${m.iconColor}_glow.png`;
    }
    return `/assets/icons/marker_${m.iconColor}.png`;
  }
}



