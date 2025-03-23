import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Products } from '../products'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [FormsModule]
})
export class CartComponent implements OnInit {
  cartItems: Products[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems.products;
    });

    this.cartService.getCartItems();
  }

  removeItem(productId: string) {
    const confirmation = confirm('Are you sure you want to remove this item?');
    if (confirmation) {
      this.cartService.removeFromCart(productId);
    }
  }
  
  updateQuantity(product: Products, quantity: number) {
    if (quantity >= 1) {
      
      this.cartService.updateProductQuantity({ id: product._id, quantity: quantity });
    }
  }
  

  clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
    }
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    this.cartService.checkout();
  }

  trackByIndex(index: number, item: Products) {
    return item._id || index;
  }
}
