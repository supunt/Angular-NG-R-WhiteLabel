import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapStateService } from '../google-map/map-state.service';
import { ComponentBase } from '../../classes/exports';
import { Subject, Observable } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { GoogleMapMarker, GoolgPlacePrediction } from '../../models/export';


declare var google: any;

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.scss']
})
export class AddressSearchComponent extends ComponentBase implements OnInit {

  @Output() addressSelected: EventEmitter<GoogleMapMarker> = new EventEmitter<GoogleMapMarker>();
  @Output() addressPredSelected: EventEmitter<GoolgPlacePrediction> = new EventEmitter<GoolgPlacePrediction>();
  @ViewChild('searchBox', {static : false}) searchBox: ElementRef;
  @Input() showNearbyAddresses = false;

  public addressList: GoogleMapMarker[] = [];
  public isMapReady = false;
  public showAddresses = false;
  public searchedAddresses = [];
  public showSearchResult = false;
  public isLoading = false;
  public isModal = false;

  private searchText$ = new Subject<any>();

  public formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal, private mapStateSvc: GoogleMapStateService, private eRef: ElementRef) {
    super();
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.formGroup = this.formBuilder.group( {
      address: ''
    });

    this.mapStateSvc.$mapState.subscribe((state: boolean) => this.isMapReady = state);
    this.formGroup.controls.address.setValue('');

      // Search field subscription
    this.rxs(this.formGroup.controls.address.valueChanges.subscribe((value: string) => {
      if (value.length > 6) {
        this.searchText$.next(value);
      }
    }));

    this.createDelayedSearchSubscription();
  }

  // -------------------------------------------------------------------------------------------------------------------
  private createDelayedSearchSubscription(): void {
    // Serch delay
    this.rxs(this.searchText$.pipe(
      debounceTime(500),
      switchMap(searchText => {
          // Saving my money :D
          if (this.isLoading) {
            return new Observable( x => {
              this.searchedAddresses = [];
              x.next(this.searchedAddresses);
              x.complete();
            });
          }

          this.isLoading = true;
          const filteredAddresses = this.searchedAddresses.filter(
            addressObj => addressObj.description.replace(',', '').toLowerCase().startsWith(searchText.toLowerCase())
          );

          // Saving my money :D
          if (filteredAddresses.length > 0) {
            this.searchedAddresses = filteredAddresses;
            const retObj = new Observable( x => {
              x.next(filteredAddresses);
              x.complete();
            });

            return retObj;
          }
          this.showAddresses = false;
          this.searchedAddresses = [];
          const acs =  new google.maps.places.AutocompleteService();
          return new Observable(x =>  {
            acs.getQueryPredictions(
                {
                  input: searchText,
                  componentRestrictions: {country: 'au'}
                }, (predictions, status) =>  {
                  this.isLoading = false;
                  x.next(predictions);
                  x.complete();
                });
            }
          );
        }),
      catchError((e) => {
        this.isLoading = false;
        this.showSearchResult = false;

        // return Observable.throw('error');
        return new Observable(x => {
          x.next(
            {
              isError : true,
              errorMessage : e
            }
          );
          x.complete();

          // Error Destroys the debounceTime hence Resubscribe
          this.createDelayedSearchSubscription();
        });
      })
    ).subscribe(
      (data: []) => {
        this.searchedAddresses = data;
        this.isLoading = false;
        this.showAddresses = true;
        this.searchBox.nativeElement.click();
      },
      err => {
        console.error('Search error', err);
        this.searchedAddresses = [];
        this.isLoading = false;
        this.showAddresses = false;
      }
    ));
  }

  // -------------------------------------------------------------------------------------------------------------------
  public addressSelectedFromList(address: GoogleMapMarker) {
    console.log('Address selected', address);

    this.showAddresses = false;
    this.addressSelected.emit(address);
  }

  // -------------------------------------------------------------------------------------------------------------------
  public addressPredictionSelected(address: GoolgPlacePrediction) {
    console.log('Address prediction selected', address);
    this.formGroup.controls.address.setValue(address.description, { emitEvent: false });
    this.searchedAddresses = [];
    this.showAddresses = false;

    this.addressPredSelected.emit(address);
  }

  // -------------------------------------------------------------------------------------------------------------------
  @HostListener('document:click', ['$event'])
  searchFocusOut(event) {
    if (this.eRef.nativeElement.contains(event.target) !== true) {
      this.searchedAddresses = [];
      this.showSearchResult = false;
    }
  }
}
