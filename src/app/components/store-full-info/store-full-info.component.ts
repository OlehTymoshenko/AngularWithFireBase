import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, DocumentChangeAction, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { ImagesInFirestorageService } from 'src/app/shared/services/images-in-firestorage.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { StoreService } from 'src/app/shared/services/store.service';


@Component({
  selector: 'app-store-full-info',
  templateUrl: './store-full-info.component.html',
  styleUrls: ['./store-full-info.component.css']
})
export class StoreFullInfoComponent implements OnInit {

  currentStore: AngularFirestoreDocument<Store>;
  currentStoreVal: Observable<Store>;
  storeProducts: Promise<DocumentChangeAction<Product>[]>;
  public allProducts: Product[] = [];

  constructor(
    private routeParams: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private productService: ProductService,
    public imageService : ImagesInFirestorageService
  ) { }

  ngOnInit(): void {

    if(this.routeParams.snapshot.paramMap.has('id')) {
      this.currentStore = this.storeService.getById(this.routeParams.snapshot.paramMap.get('id'));
      this.currentStoreVal = this.currentStore.valueChanges();
      this.productService.getAllFromSpecifieldStore(this.currentStore).then(val => {
          this.mapDocChangeActionsOfProductsToProductsArray(val);          
        });
    }
  }
  
  private mapDocChangeActionsOfProductsToProductsArray(arg : DocumentChangeAction<Product>[]) {
    arg.forEach(async item => {
      let product =  {
            name: item.payload.doc.data().name,
            description : item.payload.doc.data().description,
            price : item.payload.doc.data().price,
            photoUrl: await this.imageService.getFullUrlToPhoto(item.payload.doc.data().photoUrl)
      };

      this.allProducts.push(product);
    })
  }

  addProduct() {
    this.router.navigate(['dashboard/product/add', this.currentStore.ref.id]);
  }

}
