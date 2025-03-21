import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';
import { Products } from '../products'; // Products ინტერფეისი

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule]
})
export class HomeComponent implements OnInit {
  public ratedProducts: Products[] = [];
  noImages: string = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';  

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRatedProducts();
  }



  ///აქ გამოვიტანე მხოლოდ ხელმისაწვდომი პროდუქტები
  getRatedProducts(): void {
    this.apiService.getAllproduct().subscribe({
      next: (data: any) => {
        console.log('All products:', data);
        if (data && data.products) { 
          let availableProducts = data.products.filter((item: any) => item.stock > 0); 
          let shuffledProducts = availableProducts.sort(() => 0.5 - Math.random()); 
          this.ratedProducts = shuffledProducts.slice(0, 10); 
          console.log('Random 10 available products:', this.ratedProducts);
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  addToCart(item: Products): void {
    console.log('Product added to cart:', item);
  }
}
