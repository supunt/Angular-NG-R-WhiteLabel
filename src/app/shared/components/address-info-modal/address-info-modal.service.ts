import { Injectable, OnDestroy } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressInfoModalComponent } from './address-info-modal.component';
import { Subscription } from 'rxjs';
import { Property, cloneProperty } from '../../models/export';

@Injectable({
  providedIn: 'root'
})
export class AddressInfoModalService implements OnDestroy {

  subscriptions: Subscription[] = [];
  modalRef: NgbModalRef = null;
  constructor(private modalService: NgbModal) { }

  // -------------------------------------------------------------------------------------------------------------------
  public  Open(
    saveCallback,
    deleteCallback,
    model: Property,
    deleteDisabled = false
  ) {
    this.modalRef = this.modalService.open(AddressInfoModalComponent, { backdrop: 'static'});

    const modalInstance = this.modalRef.componentInstance as AddressInfoModalComponent;
    modalInstance.model = cloneProperty(model);
    modalInstance.deleteDisabled = deleteDisabled;

    this.subscriptions.push(modalInstance.deleteClicked.subscribe(
      data => deleteCallback(data)
    ));
    this.subscriptions.push(modalInstance.saveClicked.subscribe(
      data => saveCallback(data)
    ));
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
