import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ComponentBase } from '../../classes/component-base';
import { addRemoveClasses } from '../../utils/utils';

@Directive({
  selector: '[appInputStatus]'
})
export class InputStatusDirective extends ComponentBase implements OnInit, OnDestroy {

  constructor(private ele: ElementRef, private input: NgControl) {
    super();
  }

  private applySwatches(status): void {
    switch (status) {
      case 'INVALID': addRemoveClasses(this.ele.nativeElement, ['app-border-error'], []);
        break;
      case 'VALID': addRemoveClasses(this.ele.nativeElement, [], ['app-border-error']);
        break;
      case 'DISABLED': addRemoveClasses(this.ele.nativeElement, [], ['app-border-error']);
        break;
    }
  }

  public ngOnInit(): void {
    this.rxs(this.input.statusChanges.subscribe(status => this.applySwatches(status)));
  }
}
