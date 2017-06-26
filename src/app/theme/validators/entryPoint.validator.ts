import {AbstractControl} from '@angular/forms';

export class EntryPointValidator {

  public static validate(c: AbstractControl) {
    return !(((c.value.match( RegExp('\\.','g') ) || [] ).length) > 1) ? null : {
        validatePort: {
          valid: false
        }
      };
  }
}
