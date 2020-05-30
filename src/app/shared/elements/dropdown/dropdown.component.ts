import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SelectedDropdownItem } from '../../models/selected-dropdown-item';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  private _data = [];

  @Input()
  set data(data: any) {
    this._data = data;
  }

  get data(): any { return this._data; }

  @Input() label = undefined;
  @Input() className = '';
  @Input() key = undefined;
  @Input() optionName = 'name';
  @Input() optionValue = 'value';

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  constructor() {

  }
  private propagateChange = (_: any) => { };
  public writeValue(value: any): void {
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(isDisabled: boolean): void {
  }

  public itemClicked(itemKey: string, item: any) {
    this.clicked.emit(new SelectedDropdownItem(itemKey, item));
  }

}
