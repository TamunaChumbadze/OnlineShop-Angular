import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';
import { SigninComponent } from "../signin/signin.component"; 
import { CommonModule } from '@angular/common';
import { ScrollingNavDirective } from '../scrolling-nav.directive';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, SigninComponent, CommonModule, ScrollingNavDirective]
})
export class NavbarComponent  {
  loginCardVisible = signal(false);
  cartItemCount = signal(0);
  categories: any[] = [];


  constructor(private router: Router, private cartService: CartService, private apiService: ApiService) {
   
    this.cartService.cart$.subscribe((items: any[]) => {
      this.cartItemCount.set(items.length);  
    });
    this.loadCategories();

  
    this.loadCategories();
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
      navbar?.classList.add('solidNav');
      navbar?.classList.remove('transparentNav');
    } else {
      navbar?.classList.add('transparentNav');
      navbar?.classList.remove('solidNav');
    }
  }

  
  showLoginCard() {
    this.loginCardVisible.set(true);
  }

  hideLoginCard() {
    this.loginCardVisible.set(false);
    this.router.navigate(['/']);
  }


  loadCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;  
    });
  }

 
  onCategorySelect(event: any) {
    const categoryId = event.target.value;
    this.router.navigate(['/shop-all-products', { categoryId }]); 
  }
}
