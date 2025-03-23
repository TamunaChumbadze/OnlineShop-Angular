import { Component, signal } from '@angular/core';
import { SigninComponent } from "../signin/signin.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollingNavDirective } from '../scrolling-nav.directive';
import { CartService } from '../cart.service'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [SigninComponent, RouterModule, CommonModule, ScrollingNavDirective]  
})
export class NavbarComponent {
  loginCardVisible = signal(false);
  cartItemCount = signal(0); 

  constructor(private router: Router, private cartService: CartService) {
    // Use cart$ observable to track cart changes
    this.cartService.cart$.subscribe((items: any[]) => {
      this.cartItemCount.set(items.length);  // Update cart item count
    });
  }

  showLoginCard() {
    this.loginCardVisible.set(true);
  }

  hideLoginCard() {
    this.loginCardVisible.set(false);
    this.router.navigate(['/']);
  }
}
