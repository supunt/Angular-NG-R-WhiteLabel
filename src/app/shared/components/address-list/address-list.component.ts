import { Component, OnInit, EventEmitter, Output, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { User, Property, GoogleMapMarker } from '../../export';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ComponentBase } from '../../classes/exports';
import * as UserPropertyAction from '../../actions/user-properties.action';
import { AddressInfoModalService } from '../address-info-modal/address-info-modal.service';


@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent extends ComponentBase implements OnInit {

  @Input() locations: Property[] = null;
  @Output() addressClicked: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() addressSelected: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() refreshRequested: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('addressList', {static : false}) adrListRef: ElementRef;
  @ViewChild('togOn', {static : false}) togOn: ElementRef;
  expanded = false;

  // -------------------------------------------------------------------------------------------------------------------
  constructor(private renderer: Renderer2) {
    super();
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (this.togOn != null && this.togOn.nativeElement === event.target) {
        this.expanded = true;
        event.stopPropagation();
      } else if (this.adrListRef != null && !this.adrListRef.nativeElement.contains(event.target)) {
        this.expanded = false;
        event.stopPropagation();
      }
    });
  }

  // -------------------------------------------------------------------------------------------------------------------
  locationClicked(mapLoc: Property) {
    this.addressClicked.emit(mapLoc);
  }

  // -------------------------------------------------------------------------------------------------------------------
  locationDoubleClicked(event: Event, item: Property) {
    event.stopPropagation();
    this.addressSelected.emit(item);
  }

  // -------------------------------------------------------------------------------------------------------------------
  refreshClicked() {
    this.refreshRequested.emit();
  }
}
