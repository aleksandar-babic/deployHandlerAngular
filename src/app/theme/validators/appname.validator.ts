import {AbstractControl} from '@angular/forms';

export class AppNameValidator {

  public static validate(c:AbstractControl) {

    return (/^[a-z0-9-]+$/.test(c.value)) ? null : {
        validateUsername: {
          valid: false
        }
      };
  }
}
