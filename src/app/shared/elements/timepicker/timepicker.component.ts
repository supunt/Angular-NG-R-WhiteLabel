import { Component, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  @Input() placeholder = '';
  @Input() label = undefined;
  @Input() key = undefined;
  @Input() value = '';
  @Input() maxlength;
  @Input() className;
  @Input() showSeconds = false;
  @Input() hourStep = 1;
  @Input() minuteStep = 5;
  @Input() secondStep = 15;
  @Input() meridian = true;
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
