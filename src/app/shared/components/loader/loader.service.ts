import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // This is vital to our survival;
  // Thread safety is a risk
  private refCount = 0;


  loaderRef: NgbModalRef = null;
  constructor(private modalService: NgbModal, @Inject(PLATFORM_ID) private platformId: string) { }

  // ---------------------------------------------------------------------------------------------------------------------------------------
  Open(parentService: NgbModal = null, message: string = 'Loading') {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const serviceRef = parentService !== null ? parentService : this.modalService;

    this.refCount++;
    if (this.loaderRef) {
      return;
    }

    this.loaderRef = serviceRef.open(LoaderComponent,
      {
        centered: true,
        keyboard: false,
        backdrop: 'static',
        size: 'sm'
      });

    this.loaderRef.componentInstance.Message = message;
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------
  Close() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.loaderRef) {
      this.refCount--;
    }

    if (this.loaderRef && this.refCount === 0) {
      this.loaderRef.close();
      this.loaderRef = null;
      return;
    }
  }
}
