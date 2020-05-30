import { Injectable } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddressSearchComponent } from './address-search.component';
import { GoogleMapMarker } from '../../export';

@Injectable({
  providedIn: 'root'
})
export class AddressSearchModalService {

  modalRef: NgbModalRef = null;
  constructor(private modalService: NgbModal) { }

  public Open(
    pin: GoogleMapMarker,
    addressSelctCB) {
    this.modalRef = this.modalService.open(AddressSearchComponent,  {backdrop : 'static'});

    const modalInstance = this.modalRef.componentInstance as AddressSearchComponent;
    modalInstance.setPin(pin);

    modalInstance.addressSelected.subscribe(
      selection => {
        addressSelctCB(selection);
        this.modalRef.close();
      }

    );

  }
}
