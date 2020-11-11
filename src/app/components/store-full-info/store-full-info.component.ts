import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, DocumentChangeAction, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
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

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.has('id')) {
      this.currentStore = this.storeService.getById(this.route.snapshot.paramMap.get('id'));
      this.currentStoreVal = this.currentStore.valueChanges();
      this.storeProducts = this.productService.getAllFromSpecifieldStore(this.currentStore);

      console.log( 'Store products:' + JSON.stringify(this.storeProducts));
    }
  } 

}
