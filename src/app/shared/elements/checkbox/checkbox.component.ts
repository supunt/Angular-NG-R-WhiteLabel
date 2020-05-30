import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  @Input() label;
  @Input() id = '';
  @Input() name = '';
  @Input() value: any;
  @Input() className = '';
  @Input() key = undefined;
  @Input() set disableControl(condition: boolean){
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  public statusInvalid: boolean;

  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) { this.ngControl.valueAccessor = this; }

  }

  private propagateChange = (_: any) => { };

  private update(value: any): void {
  }

  public writeValue(value: any): void {
    this.update(value);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(isDisabled: boolean): void {
  }

  public ngOnInit(): void {
    this.ngControl.control.valueChanges.subscribe(v => {
      this.update(v);
    });

    this.ngControl.control.statusChanges.subscribe(v => {
      this.statusInvalid = this.ngControl.control.status === 'INVALID';
    });
  }
}
