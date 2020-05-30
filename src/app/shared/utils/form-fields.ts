import { Validators } from '@angular/forms';


export class FormFields {

  public static propertyTypeRequired() {
    return ['', [Validators.required, Validators.pattern('^[0-9]+$')]];
  }

  public static propertyStateRequired() {
    return ['', [Validators.required, Validators.pattern('^[0-9]+$')]];
  }

  public static email() {
    return ['', [Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$')]];
  }

  public static emailRequired() {
    return ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$')]];
  }

  public static phoneNumber() {
    return ['', [Validators.pattern('^(?:\+?)([\s\d]+)+$')]];
  }

  public static phoneNumberRequired() {
    return ['', [Validators.required, Validators.pattern('^(?:\+?)([\s\d]+)+$')]];
  }

  public static mobileNumber() {
    return ['', [Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(15)]];
  }

  public static mobileNumberRequired() {
    return ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(15)]];
  }

  public static address() {
    return ['', [Validators.required]];
  }

  public static date() {
    return [, [Validators.pattern('[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$')]];
  }
  public static dateRequired() {
    return [, [Validators.required, Validators.pattern('[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$')]];
  }

  public static password() {
    return ['', [Validators.required]];
  }

  public static userName(value: string) {
    return [value, [Validators.required, Validators.minLength(1)]];
  }

  public static numeric() {
    return ['', [Validators.pattern('^[0-9]+$')]];
  }

  public static numericRequired() {
    return ['', [Validators.required, Validators.pattern('^[0-9]+$')]];
  }

  public static required() {
    return ['', [Validators.required]];
  }

  public static default() {
    return ['', []];
  }
}

