import { Component, DestroyRef, input, output } from '@angular/core';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product = input<Product>();
  added = output<Product>();

  constructor(destroyRef: DestroyRef) {
    destroyRef.onDestroy(() => {});
  }

  addToCart() {
    this.added.emit(this.product()!);
  }
  get productTitle() {
    return this.product()!.name;
  }
}
