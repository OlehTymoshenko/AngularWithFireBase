import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  items: DocumentChangeAction<Product>[];

  constructor(
    public productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAll()
      .then((result) => {
        this.items = result;
      });
  }

  addProduct() {
    this.router.navigate(['/dashboard/product/add']);
  }

}
