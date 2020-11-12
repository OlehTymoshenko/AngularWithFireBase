import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { Observable, Observer } from 'rxjs';
import { ImagesInFirestorageService } from 'src/app/shared/services/images-in-firestorage.service';
import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  items: Product[];

  constructor(
    public productService: ProductService,
    private router: Router,
    private imageService: ImagesInFirestorageService
  ) { }

  async ngOnInit() {
    this.items = await this.productService.getAllProductsFromAllStores();
    
    for(let i = 0; i < this.items.length; i++) {
      this.items[i].photoUrl = await this.imageService.getFullUrlToPhoto(this.items[i].photoUrl);
    }
  }

  addProduct() {
    this.router.navigate(['/dashboard/product/add']);
  }

}
