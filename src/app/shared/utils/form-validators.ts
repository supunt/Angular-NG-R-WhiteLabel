import { FormGroup, FormControl, FormArray } from '@angular/forms';

export class FormValidators {

  static validateAllFormFields(formGroup: FormGroup) {

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      } else if (control instanceof FormGroup) {
        FormValidators.validateAllFormFields(control);
      } else if (control instanceof FormArray) {

        if (control.controls) {
          (control.controls).forEach
            (ctr => {
              if (ctr instanceof FormGroup) {
                FormValidators.validateAllFormFields(ctr);
              }
            });
        }
      }
    });

    return formGroup.valid;
  }

  /**
     * Set focus to first control in the form in invalid status.
     *
     * @param formGroup Form group.
  */
  static FocusInvalidControl(formGroup: FormGroup) {
    let target;

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (target) {
        return;
      }

      if (control instanceof FormControl) {

        if (!control.valid) {
          target = control;
        }
      } else if (control instanceof FormGroup) {
        FormValidators.FocusInvalidControl(control);
      } else if (control instanceof FormArray) {

        if (control.controls) {
          (control.controls).forEach
            (ctr => {

              if (ctr instanceof FormGroup) {
                FormValidators.FocusInvalidControl(ctr);
              }
            });
        }
      }
    });

    if (target) {

      if (target['focus'] !== undefined &&
        target['focus'] !== null &&
        typeof target['focus'] === 'function') {
        (target as any).focus();
      }
    }
  }
}


