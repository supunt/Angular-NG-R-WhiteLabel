import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { ComponentBase } from '../../classes/exports';
import { hasValue } from '../../utils/utils';
import { ValidationService } from '../../services/non-api/validation.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorComponent extends ComponentBase implements OnInit, OnDestroy {

  @Input() control: FormControl;
  @Input() key: string;

  public error: string;
  public errorObj: string;

  constructor(private vs: ValidationService) {
    super();
  }

  private validate(): void {

    this.error = undefined;
    const controlErrors: ValidationErrors = this.control.errors;
    this.validateAll(controlErrors);

  }

  public ngOnInit(): void {
    this.rxs(this.control.valueChanges.subscribe(x => {
      if (this.control.dirty) {
        this.validate();
      }
    }));

    this.rxs(this.control.statusChanges.subscribe(x => {
      this.validate();
    }));

    this.errorObj = this.vs.errors[this.key];
  }

  private validateAll(controlErrors): void {
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        if (controlErrors.hasOwnProperty(keyError)) {
          if (hasValue(this.errorObj)) {

            if (this.errorObj[keyError]) {
              this.error = this.errorObj[keyError];
            }
            if (controlErrors[keyError] instanceof Object) {
              this.validateAll(controlErrors[keyError]);
            }
          }
        }
      });
    }
  }

}
