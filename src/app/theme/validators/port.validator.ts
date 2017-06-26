import {AbstractControl} from '@angular/forms';

export class PortValidator {

  public static validate(c: AbstractControl) {

    return (parseInt(c.value) > 1024 && parseInt(c.value) < 49150) ? null : {
        validatePort: {
          valid: false
        }
      };
  }
}
