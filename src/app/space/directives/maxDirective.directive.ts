import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


@Directive({
  selector: '[appMax]',
  providers: [
    { provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaxDirective),
      multi: true }
  ]
})
export class MaxDirective implements Validator {
  private _validator: ValidatorFn;
  @Input() public set appMax(value: string) {
    this._validator = Validators.max(parseInt(value, 10));
  }

  public validate(control: AbstractControl): { [key: string]: any } {
    return this._validator(control);
  }
}
