import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  [x: string]: any;
  private cartSubject = new BehaviorSubject<any>({ products: [], total: { price: { current: 0, beforeDiscount: 0 }, quantity: 0, products: 0 } });
  cart$ = this.cartSubject.asObservable();
  

  constructor(private http: HttpClient, private cookies: CookieService) { }

  postProduct(body: any) {
    return this.http.post("https://api.everrest.educata.dev/shop/cart/product", body);
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
        .subscribe(() => {
          this.getCartItems();  
        });
    } else {
      alert('You are not authorized!');
      return;
    }
  }
  
  updateProductQuantity(product: { id: string, quantity: number }) {
    console.log('Sending update request with:', product);  
    return this.http.patch('https://api.everrest.educata.dev/shop/cart/product', product).subscribe(
      (response) => {
        console.log('Product updated on server:', response);
        this.getCartItems();  
      },
      (error) => {
        console.error('Error updating product quantity', error);
      }
    );
  }
  
  

  removeFromCart(productId: string) {
    const body = { id: productId }; 
    return this.http.delete(`https://api.everrest.educata.dev/shop/cart/product`, { body: body })
      .subscribe(
        () => {
          this.getCartItems(); 
          alert('Product removed from cart');
        },
        (error) => {
          console.error('Error removing product from cart', error);
          alert('Failed to remove product from cart');
        }
      );
  }
  


  clearCart() {
    return this.http.delete('https://api.everrest.educata.dev/shop/cart').subscribe(
      () => this.cartSubject.next({ products: [], total: { price: { current: 0, beforeDiscount: 0 }, quantity: 0, products: 0 } }),
      (error) => console.error('Error clearing cart', error)
    );
  }

  checkout() {
    return this.http.post('https://api.everrest.educata.dev/shop/cart/checkout', {}).subscribe(
      () => {
        alert('Checkout successful!');
        this.clearCart();
      },
      (error) => console.error('Checkout failed', error)
    );
  }
}
function throwError(error: any): void {
  throw new Error('Function not implemented.');
}

