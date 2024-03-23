import { EmailValidator } from './../../../shared/validators/email-validator.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  constructor(
    private _fb: FormBuilder,
    private _validatorsService: ValidatorsService,
  ) { }

  ngOnInit(): void {
    this.myForm.reset();
  }

  public myForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.pattern(this._validatorsService.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(this._validatorsService.emailPattern)]],
    email: ['', [Validators.required, Validators.pattern(this._validatorsService.emailPattern)], [new EmailValidator]],
    userName: ['', [Validators.required, this._validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: [
      this._validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  isInvalidField(field: string) {
    return this._validatorsService.isInvalidField(this.myForm, field);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    this.myForm.reset();
  }


}
