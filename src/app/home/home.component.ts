import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { Products } from '../products';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ RouterModule],
})
export class HomeComponent implements OnInit {
  public ratedProducts: Products[] = [];
  noImages: string =
    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

  constructor(private apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.getRatedProducts();
  }

  getRatedProducts(): void {
    this.apiService.getAllproduct().subscribe({
      next: (data: any) => {
        if (data && data.products) {
          let availableProducts = data.products.filter(
            (item: any) => item.stock > 0
          );
          let shuffledProducts = availableProducts.sort(
            () => 0.5 - Math.random()
          );
          this.ratedProducts = shuffledProducts.slice(0, 8);
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

 
  goToDetails(product: Products) {
    this.router.navigate(['/product-details', product._id]);  
  }
  
  
}
