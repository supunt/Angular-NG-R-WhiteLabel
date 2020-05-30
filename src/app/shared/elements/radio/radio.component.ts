import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() label = '';
  @Input() id = '';
  @Input() value: any;
  @Input() name: any;
  @Input() className = '';
  @Input() key = undefined;
  @Input() isDisabled = false;

  public selected = false;
  public disabled = null;
  public statusInvalid: boolean;

  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) { this.ngControl.valueAccessor = this; }
  }

  private propagateChange = (_: any) => { };

  private update(value: any): void {
  }

  public writeValue(value: any): void {
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled === false) {
      this.disabled = null;
    } else {
      this.disabled = isDisabled;
    }
  }

  public ngOnInit(): void {
    this.ngControl.control.valueChanges.subscribe(v => {
      this.update(v);
    });

    this.ngControl.control.statusChanges.subscribe(v => {
      this.statusInvalid = this.ngControl.control.status === 'INVALID';
    });

    this.setDisabledState(this.isDisabled);
  }
}
