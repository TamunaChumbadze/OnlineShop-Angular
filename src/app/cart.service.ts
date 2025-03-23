import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<any>({ products: [], total: { price: { current: 0, beforeDiscount: 0 }, quantity: 0, products: 0 } });
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient, private cookies: CookieService) { }

  postProduct(body:any) {
    return this.http.post("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  getCartItems() {
    this.http.get('https://api.everrest.educata.dev/shop/cart')
      .subscribe((cart: any) => {
        this.cartSubject.next(cart);  
      });
  }
  
  
  addToCart(product: { id: string, quantity: number }) {
    if (this.cookies.get('user')) {
      return this.http.post('https://api.everrest.educata.dev/shop/cart/product', product)
        .subscribe(() => this.getCartItems());  
    } else {
      alert('You are not authorized!');
      return;  
    }
  }
  

  
  updateProductQuantity(product: { id: string, quantity: number }) {
    return this.http.patch('https://api.everrest.educata.dev/shop/cart/product', product)
      .subscribe(() => this.getCartItems()); 
  }

  removeFromCart(productId: string) {
    return this.http.delete(`https://api.everrest.educata.dev/shop/cart/product?id=${productId}`)
      .subscribe(() => this.getCartItems());  
  }


  clearCart() {
    return this.http.delete('https://api.everrest.educata.dev/shop/cart')
      .subscribe(() => this.cartSubject.next([]));  
  }
  
  checkout() {
    return this.http.post('https://api.everrest.educata.dev/shop/cart/checkout', {})
      .subscribe(() => {
        alert('Checkout successful!');
        this.clearCart();  
      });
  }
}
