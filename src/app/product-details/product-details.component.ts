import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Products } from '../products';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [CommonModule]
})

export class ProductDetailsComponent implements OnInit {
  public product: Products | null = null;
  public mainImage: string | null = null;
  noImages: string = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'; 
  public quantity: number = 1;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private cookies: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('_id');  
    if (productId) {
      this.getProductDetails(productId);
    }
  }

  getProductDetails(id: string): void {
    this.apiService.getProductById(id).subscribe({
      next: (product: Products) => {
        this.product = product;
        this.mainImage = product.images[0];
      },
      error: (error) => console.error('Error fetching product details:', error),
    });
  }

  changeMainImage(image: string, event: Event): void {
    this.mainImage = image;
  
    const thumbnail = event.target as HTMLElement;
    if (thumbnail) {
      this.clearSelectedThumbnails();
      thumbnail.classList.add('selected');
    }
  }

  clearSelectedThumbnails(): void {
    const thumbnails = document.querySelectorAll('.thumbnail') as NodeListOf<HTMLElement>;
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('selected');
    });
  }

  thumbnailClicked(event: Event): void {
    const target = event.target as HTMLElement | null; 
    if (target) {
      const thumbnailImage = target.querySelector('img') as HTMLImageElement | null;
      if (thumbnailImage) {
        this.mainImage = thumbnailImage.src;
      }
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(item: any) {
    const userCookie = this.cookies.get('user');
  
    if (userCookie) {
      let info = {
        id: item._id,
        quantity: this.quantity,  // განახლებული რაოდენობა
      };
  
      this.apiService.getUser().subscribe(
        (data: any) => {
          if (data && data.cartID) {
            this.apiService.updateProduct(info).subscribe(
              (response: any) => {
                console.log('Product updated:', response);
                this.quantity = 1;  // დააბრუნოს საწყის რაოდენობა
              },
              (error) => console.error('Update error:', error)
            );
          } else {
            this.apiService.postProduct(info).subscribe(
              (response: any) => {
                console.log('Product added:', response);
                this.quantity = 1;  // დააბრუნოს საწყის რაოდენობა
              },
              (error) => console.error('Add error:', error)
            );
          }
        },
        (error) => {
          console.error('User fetch error:', error);
          alert('Authorization check failed. Please log in again.');
          this.router.navigate(['/login']);
        }
      );
    } else {
      console.log("User is not authorized");
      alert('You are not authorized!');
      this.router.navigate(['/login']);
    }
  }
  
}
