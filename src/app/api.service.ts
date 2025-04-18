import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllProducts } from './all-products';
import {  Observable} from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  signUp(body: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", body)
  }

  signIn(body: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", body)
  }

  getUser() {
    return this.http.get("https://api.everrest.educata.dev/auth");
  }

  getProductsByBrand(brand: string, page: number = 1) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/brand/${brand}?page_index=${page}&page_size=12`);
  }

  getAllproduct(page: number = 1) {
    return this.http.get<AllProducts>(`https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=12`);
  }

  getBrands() {
    return this.http.get<string[]>('https://api.everrest.educata.dev/shop/products/brands');
  }

  postProduct(body: any) {
    return this.http.post("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  updateProduct(body: any) {
    return this.http.patch("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  getCartItems(cartId: string) {
    return this.http.get<any>(`https://api.everrest.educata.dev/shop/cart/${cartId}`);
  }

  getRatedProducts() {
    return this.http.get<any>('https://api.everrest.educata.dev/shop/products/rate');
  }

  getProductById(id: string): Observable<Products> {  
    return this.http.get<Products>(`https://api.everrest.educata.dev/shop/products/id/${id}`);
  }
  

  getCategories() {
    return this.http.get<any[]>('https://api.everrest.educata.dev/shop/products/categories');
  }

  getProductsByCategory(categoryId: string, page: number = 1, pageSize: number = 12) {
    return this.http.get<any>(`https://api.everrest.educata.dev/shop/products/category/${categoryId}?page_index=${page}&page_size=${pageSize}`);
  }
}
