import {AbstractControl} from '@angular/forms';

export class EntryPointValidator {

  public static validate(c: AbstractControl) {
    return !((((c.value.match(new RegExp('\\.','g') ) || [] ).length) > 1) || c.value.match(new RegExp('\\s'))) ? null : {
        validateEntryPoint: {
          valid: false
        }
      };
  }
}
