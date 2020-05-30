import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card-number.component.html',
  styleUrls: ['./card-number.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardNumberComponent implements OnInit {


  @Input() placeholder = '';
  @Input() label = undefined;
  @Input() key = undefined;
  @Input() value = '';
  @Input() className = '';
  @Input() maxlength;
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
    this.regex = new RegExp(/^[0-9]{1,4} ?([0-9]{1,4}){0,1} ?([0-9]{1,4}){0,1} ?([0-9]{1,4}){0,1}$/);
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

    const current: string = this.ngControl.value;


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
    }  else  {
      let chIbn = next.split(' ').join('');
      if (chIbn.length > 0) {

        chIbn = chIbn.match(new RegExp('.{1,4}', 'g')).join(' ');
        if (chIbn.length === 4) {
          chIbn = chIbn + ' ';
        }
        this.ngControl.control.setValue(chIbn);
        event.preventDefault();
      }
    }
  }
}
