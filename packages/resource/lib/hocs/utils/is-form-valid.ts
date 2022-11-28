import { FormState } from 'final-form';

export function isFormValid(form: FormState<any, any>): boolean {
  if (!form.dirty) {
    return false;
  }
  if (form.hasValidationErrors) {
    return false;
  }
  if (form.hasSubmitErrors && !form.dirtySinceLastSubmit) {
    return false;
  }
  return true;
}
