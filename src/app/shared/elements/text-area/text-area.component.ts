import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextAreaComponent implements OnInit {

  @Input() placeholder = '';
  @Input() label = undefined;
  @Input() key = undefined;
  @Input() value = '';
  @Input() className = '';
  @Input() labelClassName = '';
  @Input() maxlength;
  @Input() readonly;
  @Input() toolTip = undefined;
  @Output() blur = new EventEmitter<any>();

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
  public onBlur(event) {
    this.blur.emit(event);
  }
}
