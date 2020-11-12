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

  items: Observable<Product[]>;

  constructor(
    public productService: ProductService,
    private router: Router,
    private imageService: ImagesInFirestorageService
  ) { }

  ngOnInit() {
    this.productService.getAllProductsFromAllStores().then(val => this.items = val);
      // observebleProdArr.pipe(map(prodArr => {
      //   for(let i = 0; i < prodArr.length; i++) {

      //   }
      // })).subscribe() 
      
      
      
      
      
      // (async val => {
      //   if(val !== null || val !== undefined) {
      //     for(let i = 0; i < val.length; i++) {
      //       val[i].photoUrl = await this.imageService.getFullUrlToPhoto(val[i].photoUrl);
      //       this.items.push(val[i]);
      //     }
      //   }
      // })

      // console.log('before subscribe');
      // observebleProdArr.pipe(map(async val => {
      //   if(val !== null || val !== undefined) {
      //     for(let i = 0; i < val.length; i++) {
      //       val[i].photoUrl = await this.imageService.getFullUrlToPhoto(val[i].photoUrl);
      //     }
      //   }
      //   return val;
      // })).toPromise().then(async val => this.items = await val);
    // })
  }

  addProduct() {
    this.router.navigate(['/dashboard/product/add']);
  }

}
