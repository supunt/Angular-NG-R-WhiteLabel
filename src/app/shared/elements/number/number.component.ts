import { Component, OnInit, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  @Input() placeholder = '';
  @Input() label = undefined;
  @Input() key = undefined;
  @Input() className = '';
  @Input() labelClassName = '';
  @Input() maxlength;
  @Input() allowDecimals = true;
  @Input() readonly;
  @Output() blur = new EventEmitter<any>();

  private regex: RegExp;
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'Right',
    'ArrowRight',
    'Left',
    'ArrowLeft',
    'Del',
    'Delete'];

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
    if (this.allowDecimals === true) {
      this.regex = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
    } else {
      this.regex = new RegExp('^[0-9]*$');
    }
  }

  public onBlur(event) {
    this.blur.emit(event);
  }

  @HostListener('keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {

    // Allow special keys
    if (this.specialKeys.indexOf(event.key) !== -1 || (event.key && event.ctrlKey)) {
      return;
    }

    let current: string;

    if (this.ngControl.value === undefined ||
      this.ngControl.value === null) {
      current = '';
    } else {
      current = this.ngControl.value;
    }

    // To accept Numpad decimal key from Edge browser
    let currentKey: string;
    if (event.key === 'Decimal') {
      currentKey = '.';
    } else {
      currentKey = event.key;
    }

    // Since the current value on the DOM element
    // is not yet updated with the value from this event
    // build the next possible value for validation.
    const next: string = current + currentKey;

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
