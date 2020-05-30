import { Component, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  private _data = [];

  @Input()
  set data(data: any) {
    this._data = data;
  }

  get data(): any { return this._data; }

  @Input() label = undefined;
  @Input() className = '';
  @Input() key = undefined;
  @Input() optionName = undefined;
  @Input() optionValue = undefined;
  @Input() isNotActive = undefined;

  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) { this.ngControl.valueAccessor = this; }
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

  public ngOnInit(): void {

  }
}
