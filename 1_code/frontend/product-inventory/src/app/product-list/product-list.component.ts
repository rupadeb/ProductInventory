import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderRowDef,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Product>;
  products: Product[] = [];
  dataSource = new MatTableDataSource<Product>(this.products);

  displayedColumns: string[] = [
    'serial',
    'name',
    'quantity',
    'price',
    'actions',
  ];
  selectedProduct: Product | undefined;

  //by using inject word you don't need the constructor to use the Product service
  //private readonly productService = inject(ProductService);

  // without using inject you must add this constructor section
  constructor(
    private readonly productService: ProductService,
    private readonly dialog: MatDialog,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      // Add a serial property only for display
      this.products = products.map((product, index) => ({
        ...product,
        serial: index + 1,
      }));
      this.dataSource.data = [...this.products];
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: null, // empty form for adding
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.addProduct(result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: product, // pass existing product into the form
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        this.productService.updateProduct(product.id, result).subscribe(() => {
          this.loadProducts(); // refresh list after save
        });
      }
    });
  }

  deleteProduct(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product.id).subscribe(() => {
        // Remove by ID (safer than name)
        const updatedProducts = this.products
          .filter((p) => p.id !== product.id)
          .map((p, index) => ({ ...p, serial: index + 1 }));

        // Update products array and datasource
        this.products = updatedProducts;
        this.dataSource.data = updatedProducts;
        this.table.renderRows();
        // this.cd.detectChanges();
      });
    }
  }
}
