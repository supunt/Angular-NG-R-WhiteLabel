import { Component, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.scss']
})
export class TelephoneComponent implements OnInit {

  @Input() placeholder = '';
  @Input() label = undefined;
  @Input() key = undefined;
  @Input() className = '';
  @Input() maxlength;
  @Input() value = '';

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
