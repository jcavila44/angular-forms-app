import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  public person = {
    gender: 'F',
    wantNotificacions: false,
  }

  public myForm: FormGroup = this._fb.group({
    gender: ['M', [Validators.required]],
    wantNotificacions: [true, [Validators.required]],
    termsAndConditions: [true, [Validators.requiredTrue]],
  });

  isInvalidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    this.myForm.reset();
  }

}
