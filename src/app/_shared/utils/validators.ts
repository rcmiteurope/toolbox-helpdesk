import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validators for Reactive Forms.
 */
export class CustomValidators {
  /**
   * Validates that two fields match (e.g., password and confirmPassword).
   */
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  /**
   * Validates that the password meets minimum complexity requirements.
   */
  static passwordComplexity(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

      return !isValid ? { passwordComplexity: true } : null;
    };
  }
}
