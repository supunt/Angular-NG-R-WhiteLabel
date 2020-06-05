import { Component, OnInit, EventEmitter, Output, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User, Property, GoogleMapMarker, cloneProperty } from '../shared/export';
import { AddressInfoModalService } from '../address-info-modal/address-info-modal.service';
import UserPropertiesState from '../shared/state/user-properties.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ComponentBase } from '../shared/classes/exports';
import * as UserPropertyAction from '../shared/actions/user-properties.action';


@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent extends ComponentBase implements OnInit {

  userLocations$: Observable<UserPropertiesState>;
  myLocations: Property[] = null;
  @Output() addressClicked: EventEmitter<GoogleMapMarker> = new EventEmitter<GoogleMapMarker>();
  @ViewChild('addressList', {static : false}) adrListRef: ElementRef;
  @ViewChild('togOn', {static : false}) togOn: ElementRef;
  @ViewChild('togOff', {static : false}) togOff: ElementRef;
  expanded = false;

  // -------------------------------------------------------------------------------------------------------------------
  constructor(private infoSvc: AddressInfoModalService,
              private store: Store<{ userProperties: UserPropertiesState }>,
              private renderer: Renderer2) {
    super();
    this.userLocations$ = store.pipe(select('userProperties'));
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.rxs(this.userLocations$.subscribe(
      data => {
        this.myLocations = data.userProperties;
      }
    ));

    this.renderer.listen('window', 'click', (event: Event) => {
      if (this.togOn != null && this.togOn.nativeElement === event.target) {
        this.expanded = true;
        event.stopPropagation();
      } else if (this.togOff != null &&  this.togOff.nativeElement === event.target) {
        this.expanded = false;
        event.stopPropagation();
      }
      if (this.adrListRef != null && !this.adrListRef.nativeElement.contains(event.target)) {
        this.expanded = false;
        event.stopPropagation();
      }
    });

    this.store.dispatch(UserPropertyAction.GetPropertiesAction());
  }

  // -------------------------------------------------------------------------------------------------------------------
  focussAddress(mapLoc: GoogleMapMarker) {
    this.addressClicked.emit(mapLoc);
  }

  // -------------------------------------------------------------------------------------------------------------------
  OpenInfoWindow(event: Event, item: Property) {
    const editableItem = cloneProperty(item);
    event.stopPropagation();
    this.infoSvc.Open(() => {
      this.store.dispatch(UserPropertyAction.BeginSavePropertyAction({payload : editableItem}));
    }, () => {
      this.store.dispatch(UserPropertyAction.BeginRemovePropertyAction({payload : editableItem}));
    }, editableItem, false);
  }

  // -------------------------------------------------------------------------------------------------------------------
  toggle() {
    // this.expanded = !this.expanded;
  }
}
