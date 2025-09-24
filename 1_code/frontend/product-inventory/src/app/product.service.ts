import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:8080/product';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/getall`);
  }

  getByName(name: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/name/${name}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/add`, product);
  }

  updateProduct(id: number,product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/update/${id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<Product> {
    console.log("Delete Product",id);
    return this.http.delete<Product>(`${this.apiUrl}/delete/${id}`);
  }
}
