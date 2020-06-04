import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User, Property, GoogleMapMarker } from '../shared/export';
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
  expanded = false;

  // -------------------------------------------------------------------------------------------------------------------
  constructor(private infoSvc: AddressInfoModalService,
              private store: Store<{ userProperties: UserPropertiesState }>) {
    super();
    this.userLocations$ = store.pipe(select('userProperties'));
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.rxs(this.userLocations$.subscribe(
      data => {
        console.log('loc updated', data);
        this.myLocations = data.userProperties;
      }
    ));

    this.store.dispatch(UserPropertyAction.GetPropertiesAction());
  }

  // -------------------------------------------------------------------------------------------------------------------
  focussAddress(mapLoc: GoogleMapMarker) {
    this.addressClicked.emit(mapLoc);
  }

  // -------------------------------------------------------------------------------------------------------------------
  OpenInfoWindow(event: Event, item) {
    event.stopPropagation();
    this.infoSvc.Open(() => {}, () => {
      this.store.dispatch(UserPropertyAction.BeginRemovePropertyAction({payload : item}));
    }, item, false);
  }

  // -------------------------------------------------------------------------------------------------------------------
  toggle() {
    this.expanded = !this.expanded;
  }
}
