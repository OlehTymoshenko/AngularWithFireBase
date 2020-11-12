import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference, DocumentChangeAction, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable, Observer } from 'rxjs';
import { Product } from '../models/product';
import { Store } from '../models/store';
import { ImagesInFirestorageService } from './images-in-firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/stores';
  private dbPathToProducts = 'products';

  storesRef : AngularFirestoreCollection<Store> = null;

  constructor(
    private afs: AngularFirestore,
    private imageService : ImagesInFirestorageService
  ) {
    this.storesRef = afs.collection(this.dbPath);
  }
  
  async getAllProductsFromAllStores(): Promise<Product[]> {
    let eachStoreProductCollectionRefs : CollectionReference[] = [];
    let docChangeActionArr : DocumentChangeAction<Store>[];
    let allProducts : Product[]= [];

   // get arr of links to products collection for every store
    docChangeActionArr = await new Promise((resolve, reject) => { this.storesRef.snapshotChanges().subscribe(data => {
        resolve(data);
      })
    })

    docChangeActionArr.forEach(val => {
      console.log(val.payload.doc.ref.path);
      eachStoreProductCollectionRefs.push(val.payload.doc.ref.collection(this.dbPathToProducts));
    })
        
    // get products from references
    for(let i = 0; i < eachStoreProductCollectionRefs.length; i++) {
      let collRef = await eachStoreProductCollectionRefs[i].get();

      for(let docsCounter = 0; docsCounter < collRef.docs.length; docsCounter++) {
        if(collRef.docs[docsCounter] !== undefined && collRef.docs[docsCounter] !== null &&
          collRef.docs[docsCounter].exists) {
            allProducts.push(collRef.docs[docsCounter].data() as Product);
        }
      }
    }
    
    return allProducts;
 }

 async getAllFromSpecifieldStore(currentStoreRef : AngularFirestoreDocument<Store>) : Promise<DocumentChangeAction<Product>[]> {
  const productsRef = currentStoreRef.collection<Product>(this.dbPathToProducts);
  return new Promise<DocumentChangeAction<Product>[]>((resolve, reject) => {
    productsRef.snapshotChanges()
      .subscribe(snapshot => {
        resolve(snapshot);
      })
  })
 }

 create(storeId: string,  product: Product): Promise<DocumentReference> {

  const productsRef = this.storesRef.doc(storeId).collection(this.dbPathToProducts);

  return productsRef.add({
     name: product.name,
     price: product.price,
     photoUrl: product.photoUrl,
     description: product.description
   });
 }

 private async getFullUrlToPhoto(path : string) : Promise<string>  {
  let regEx = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  let resUrl = "";

  if(regEx.test(path)) {
    resUrl = path;
  }
  else {
    await this.imageService.downloadImage(path).toPromise().then(x => {
      resUrl = (x as string)
    });
  }

  return resUrl;
 }

//  update(id:string, store: Product): Promise<void> {
//    return this.productsRef.doc(id).update(store);
//  }

//  delete(id: string) : Promise<void> {
//    return this.productsRef.doc(id).delete();
//  }
}
