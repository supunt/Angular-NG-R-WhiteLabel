import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property, FormFields, FormValidators,
         GoolgPlacePrediction, PropertyType,
         getPropertyTypeDisplay,
         getPropertyStateDisplay, PropertyState, SelectedDropdownItem } from '../shared/export';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComponentBase } from '../shared/classes/exports';

@Component({
  selector: 'app-address-info-modal',
  templateUrl: './address-info-modal.component.html',
  styleUrls: ['./address-info-modal.component.scss']
})
export class AddressInfoModalComponent extends ComponentBase implements OnInit {

  @Input() model: Property;
  @Input() deleteDisabled = false;
  @Output() saveClicked: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() deleteClicked: EventEmitter<Property> = new EventEmitter<Property>();
  public formGroup: FormGroup;
  public addressSearchEnabled = false;
  public ddlOptionName = 'key';
  public ddlOptionValue = 'value';
  public validationErrors = [];

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    super();
  }

  // -------------------------------------------------------------------------------------------------------------------
  public getPropertyTypeDisplay(val: PropertyType) {
    return getPropertyTypeDisplay(val);
  }

  // -------------------------------------------------------------------------------------------------------------------
  public getPropertyStateDisplay(val: PropertyState) {
    return getPropertyStateDisplay(val);
  }


  // -------------------------------------------------------------------------------------------------------------------
  public getPropertyTypeDDLObject() {
    const propertyTypeDDLObject = [];
    for (const pKey of Object.keys(PropertyType).filter(key => !isNaN(Number(PropertyType[key])))) {
      propertyTypeDDLObject.push(
        new SelectedDropdownItem(getPropertyTypeDisplay(PropertyType[pKey]), PropertyType[pKey]));
    }

    return propertyTypeDDLObject;
  }

  // -------------------------------------------------------------------------------------------------------------------
  public getPropertyStateDDLObject() {
    const propertyStateDDLObject = [];
    for (const pKey of Object.keys(PropertyState).filter(key => !isNaN(Number(PropertyState[key])))) {
      propertyStateDDLObject.push(
        new SelectedDropdownItem(getPropertyStateDisplay(PropertyState[pKey]), PropertyState[pKey]));
    }

    return propertyStateDDLObject;
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: FormFields.required(),
      propertyType: FormFields.propertyTypeRequired(),
      propertyState: FormFields.propertyStateRequired(),
      notes: FormFields.default()
    });

    this.formGroup.controls.name.setValue('' , {emitEvent : false});
    this.formGroup.controls.notes.setValue(this.model.notes , {emitEvent : false});
    this.formGroup.controls.propertyType.setValue(null , {emitEvent : false});
    this.formGroup.controls.propertyState.setValue(null , {emitEvent : false});

    this.rxs(this.formGroup.controls.name.valueChanges.subscribe(
      data => this.model.label = data
    ));
    this.rxs(this.formGroup.controls.notes.valueChanges.subscribe(
      data => this.model.notes = data
    ));
    this.rxs(this.formGroup.controls.propertyType.valueChanges.subscribe(
      data => this.model.propertyType = data
    ));
    this.rxs(this.formGroup.controls.propertyState.valueChanges.subscribe(
      data => this.model.propertyState = data
    ));

  }

  // -------------------------------------------------------------------------------------------------------------------
  saveMarker() {
    if (!FormValidators.validateAllFormFields(this.formGroup)) {
      return;
    }

    this.activeModal.close();
    this.saveClicked.emit(this.model);
  }

  // -------------------------------------------------------------------------------------------------------------------
  deleteMarker() {
    this.activeModal.close();
    this.deleteClicked.emit(this.model);
  }

  // -------------------------------------------------------------------------------------------------------------------
  editMarker() {
    this.activeModal.close();
    this.deleteClicked.emit(this.model);
  }

  // -------------------------------------------------------------------------------------------------------------------
  OnAddressPrediction(address: GoolgPlacePrediction) {
    this.addressSearchEnabled = false;
    this.model.address = address.description;
  }

  // -------------------------------------------------------------------------------------------------------------------
  isFormValid() {
    return this.model.address != null && this.model.address !== '' && this.formGroup.valid;
  }
}
