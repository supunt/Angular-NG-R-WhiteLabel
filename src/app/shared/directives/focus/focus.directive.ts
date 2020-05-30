import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit {
  constructor(private el: ElementRef, private control: NgControl) {
  }

  // -------------------------------------------------------------------------------------------------------------------
  ngAfterViewInit(): void {
    const element: HTMLElement = this.el.nativeElement;
    (this.control.control as any).focus = () => element.focus();
  }
}
