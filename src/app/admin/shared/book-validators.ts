import { FormArray, FormControl, ValidationErrors } from '@angular/forms';

export class BookValidators {

  static atLeastOneAuthor(controlArray: FormArray): ValidationErrors | null {
    if (controlArray.controls.some(el => el.value)) {
      return null;
    } else {
      return {
        atLeastOneAuthor: { valid: false}
      };
    }
  }

  static isbnFormat(control: FormControl): ValidationErrors | null {
    if (!control.value) { return null; }

    const numbers = control.value.replace(/-/g, '');
    const ibsnPattern = /(^\d{10}$)|(^\d{13}$)/;

    if (ibsnPattern.test(numbers)) {
      return null;
    } else {
      return {
        isbnFormat: { valid: false}
      };
    }
  }
}
