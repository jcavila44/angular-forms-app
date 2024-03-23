import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  constructor(private _fb: FormBuilder) { }

  get getFavoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }


  public inputAddFavorite: FormControl = new FormControl('', [Validators.required]);
  public myForm: FormGroup = this._fb.group({

    name: ['', [Validators.required, Validators.minLength(5)]],
    favoriteGames: this._fb.array([
      ['BO III', Validators.required],
      ['Assasins Creed', Validators.required],
    ]),
  });


  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log("hablamelo", this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this._fb.array([]);
    this.myForm.reset();

  }

  isInvalidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case `required`:
          return `Este campo es requerido.`;

        case `minLength`:
          return `Mininmo ${errors['minLength'].requiredLength} carácteres.`;
      }
    }

    return null;

  }

  onDeleteField(index: number): void {
    this.getFavoriteGames.removeAt(index);
  }

  onSaveField(): void {
    if (this.inputAddFavorite.invalid) return;
    this.getFavoriteGames.push(new FormControl(this.inputAddFavorite.value, Validators.required));
    this.inputAddFavorite.reset();
  }

}
