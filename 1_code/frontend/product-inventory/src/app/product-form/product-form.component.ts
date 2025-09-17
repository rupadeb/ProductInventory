import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Product } from '../product';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatLabel,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  products: Product[] = [];
  productForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Product
  ) {
    this.productForm = this.fb.group({
      id: [data?.id || null],
      name: [
        data?.name || '',
        [Validators.required,
        lettersOnlyValidator]
      ],
      quantity: [data?.quantity || 0, Validators.required, ],
      price: [data?.price || 0, Validators.required],
    });
  }

  save() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
function lettersOnlyValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return /^[A-Za-z\s]+$/.test(control.value) ? null : { lettersOnly: true };
}

