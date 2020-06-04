import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements OnInit {
  @Input() placeholder = '';
  @Input() label = undefined;
  @Input() key = undefined;
  @Input() value = '';
  @Input() maxlength;
  @Input() className;
  @Input() maxDate;
  @Input() minDate;
  @Input() set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) { this.ngControl.valueAccessor = this; }
  }

  private propagateChange = (_: any) => {
  }

  public writeValue(value: any): void {
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(isDisabled: boolean): void {
  }

  public ngOnInit(): void {    this.ngControl.control.valueChanges.subscribe( x => {});
  }

}
