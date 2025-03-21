import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Products } from '../products';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BrandFilterComponent } from "../brand-filter/brand-filter.component";

@Component({
  selector: 'app-shop-all-products',
  templateUrl: './shop-all-products.component.html',
  styleUrls: ['./shop-all-products.component.css'],
  imports: [BrandFilterComponent],
})
export class ShopAllProductsComponent {
  public productList: Products[] = [];
  public filteredProductList: Products[] = [];
  public pageList: number[] = [];
  public currentPage: number = 1;
  public noImages: string = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  public currentBrand: string = '';

  constructor(private service: ApiService, private router: Router, private cookies: CookieService) {
    this.showAllProducts();
  }

  showAllProducts(page: number = 1, brand: string = '') {
    this.currentPage = page;
    if (brand === 'all') {
      this.service.getAllproduct(page).subscribe((data: any) => {
        this.productList = data.products;
        this.filteredProductList = this.productList;
        let maxPage = Math.ceil(data.total / data.limit);
        this.pageList = Array.from({ length: maxPage }, (_, i) => i + 1);
      });
    } else if (brand) {
      this.service.getProductsByBrand(brand, page).subscribe((data: any) => {
        this.productList = data.products;
        this.filteredProductList = this.productList;
        let maxPage = Math.ceil(data.total / data.limit);
        this.pageList = Array.from({ length: maxPage }, (_, i) => i + 1);
      });
    } else {
      this.service.getAllproduct(page).subscribe((data: any) => {
        this.productList = data.products;
        this.filteredProductList = this.productList;
        let maxPage = Math.ceil(data.total / data.limit);
        this.pageList = Array.from({ length: maxPage }, (_, i) => i + 1);
      });
    }
  }

  goToPage(page: number) {
    this.showAllProducts(page, this.currentBrand);
  }

  addToCart(item: any) {
    if (this.cookies.get('user')) {
      let info = {
        id: item._id,
        quantity: 1,
      };
      this.service.getUser().subscribe((data: any) =>
        data.cartID
          ? this.service.updateProduct(info).subscribe((data: any) => console.log(data))
          : this.service.postProduct(info).subscribe((data: any) => console.log(data))
      );
    } else {
      alert('You are not authorized!');
      this.router.navigate(['/login']);
    }
  }

  onBrandSelected(brand: string) {
    this.currentBrand = brand;
    this.showAllProducts(1, brand);
  }
}
