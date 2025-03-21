import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.css']
})
export class BrandFilterComponent implements OnInit {
  @Output() brandSelected = new EventEmitter<string>();  
  public brands: string[] = [];
  selectedBrand: string = 'all';  

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.fetchBrands();
  }

  fetchBrands() {
    this.service.getBrands().subscribe((data: string[]) => {
      this.brands = ['all', ...data];  
    });
  }


  onBrandClick(brand: string) {
    this.selectedBrand = brand; 
    this.brandSelected.emit(brand);  
  }
}
