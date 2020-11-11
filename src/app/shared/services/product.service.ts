import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference, DocumentChangeAction, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable, Observer } from 'rxjs';
import { Product } from '../models/product';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/stores';
  private dbPathToProducts = 'products';

  storesRef : AngularFirestoreCollection<Store> = null;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.storesRef = afs.collection(this.dbPath);
  }
  
  async getAllProductsFromAllStores(): Promise<Product[]> {
    let eachStoreProductsRefs : CollectionReference[];
    let docChangeActionArr : DocumentChangeAction<Store>[];
    let allProducts : Observable<Product[]>;


    // get arr of links to products collection for every store
    await this.storesRef.snapshotChanges().toPromise().then(data => {
      console.log('DAMN2');
      console.log('docChangeAction' + this.storesRef.toString());
      docChangeActionArr = data;
    }).catch(err => console.log(err));


    docChangeActionArr.forEach(val => {
      eachStoreProductsRefs.push(val.payload.doc.ref.collection(this.dbPathToProducts));
    })

    // get products from references
    
    allProducts = new Observable<Product[]>((observer) => {
      eachStoreProductsRefs.forEach(ref => {
        
        ref.get().then(val => {
          let curStoreProducts : Product[] = null;
          val.forEach(doc => {
            curStoreProducts.push(doc.data() as Product);
          })
            console.log("ADD PRODUCTS IN OBSERVEBLE:" + JSON.stringify(curStoreProducts)); ////////////////////////////// TEST
            observer.next(curStoreProducts);
        })
        observer.complete();
      })
    })
    
    return allProducts.toPromise();

 }

 getAllFromSpecifieldStore(currentStoreRef : AngularFirestoreDocument<Store>) : Promise<DocumentChangeAction<Product>[]> {
  const productsRef = currentStoreRef.collection<Product>('products');
  return new Promise<DocumentChangeAction<Product>[]>((resolve, reject) => {
    productsRef.snapshotChanges()
      .subscribe(snapshot => {
        resolve(snapshot);
      })
  })
 }

//  create(product: Product): Promise<DocumentReference> {
//    return this.productsRef.add({
//      name: product.name,
//      price: product.price,
//      photoUrl: product.photoUrl,
//      description: product.description
//    });
//  }

//  update(id:string, store: Product): Promise<void> {
//    return this.productsRef.doc(id).update(store);
//  }

//  delete(id: string) : Promise<void> {
//    return this.productsRef.doc(id).delete();
//  }
}
