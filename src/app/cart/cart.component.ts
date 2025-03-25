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
    
    this.cartService.cart$.subscribe((cartItems: { products: Products[] }) => {
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

  increaseQuantity(item: Products): void {
    if (item.quantity < item.stock) {
      item.quantity++; 
      console.log(`Increased quantity: ${item.quantity}`); 
      this.updateQuantity(item);  
    } else {
      console.log('Cannot increase quantity, stock limit reached');
    }
  }
  
  decreaseQuantity(item: Products): void {
    if (item.quantity > 1) {
      item.quantity--;  
      console.log(`Decreased quantity: ${item.quantity}`);  
      this.updateQuantity(item);  
    } else {
      console.log('Cannot decrease quantity below 1');
    }
  }
  
  updateQuantity(item: Products): void {
    console.log(`Updating quantity on server: ${item.quantity}`);
    this.cartService.updateProductQuantity({ id: item._id, quantity: item.quantity });
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
  totalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.pricePerQuantity * item.quantity);
    }, 0);
  }
  trackByIndex(index: number, item: Products) {
    return item._id || index;
  }
}
