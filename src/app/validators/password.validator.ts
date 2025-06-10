import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidators {
    static strongPassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.value;

            if (!password) {
                return null;
            }

            if (password.length < 8) {
                return { strongPassword: { message: 'La contraseña debe tener al menos 8 caracteres. ' } };
            }

            const hasLetter = /[a-zA-Z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            if (!hasLetter || !hasNumber) {
                return { strongPassword: { message: 'La contraseña debe incluir letras y números. ' } }
            }

            const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
            if (!hasSymbol) {
                return { strongPassword: { message: 'La contraseña debe contener al menos 1 simbolo. ' } };
            }

            return null;
        };
    }

        static matchPassword(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn  {
            return (formGroup: AbstractControl) : ValidationErrors | null => {
                const passwordControl = formGroup.get(passwordControlName);
                const confirmPasswordControl = formGroup.get(confirmPasswordControlName);

                if (!passwordControl || !confirmPasswordControl) {
                    return null;
                }

                if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
                    return null;
                }

                if (passwordControl.value !== confirmPasswordControl.value) {
                    confirmPasswordControl.setErrors({ passwordMismatch: true });
                    return { passwordMismatch: true };
                } else {
                    confirmPasswordControl.setErrors(null);
                }

                return null;
            }
        }
    }