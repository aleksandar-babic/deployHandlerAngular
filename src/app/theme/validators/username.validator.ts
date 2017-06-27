import {AbstractControl} from '@angular/forms';

export class UsernameValidator {

  public static validate(c:AbstractControl) {

    return !(/\s/.test(c.value)) ? null : {
        validateUsername: {
          valid: false
        }
      };
  }
}
