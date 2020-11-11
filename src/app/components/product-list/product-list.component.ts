import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  items: Promise<Product[]> = null;

  constructor(
    public productService: ProductService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.items = this.productService.getAllProductsFromAllStores();
  }

  addProduct() {
    this.router.navigate(['/dashboard/product/add']);
  }

}
