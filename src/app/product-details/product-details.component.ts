import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service'; 

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productDetails: any;
  private productId!: string;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
   
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getProductDetails(this.productId);
  }

  getProductDetails(id: string): void {
   
    this.apiService.getProductById(id).subscribe({
      next: (data) => {
        this.productDetails = data;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }
}
