import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  productsRef : AngularFirestoreCollection<Product> = null;

  constructor(private afs: AngularFirestore) {
    this.productsRef = afs.collection(this.dbPath);
  }
  
  getAll(): Promise<DocumentChangeAction<Product>[]> {
    return new Promise<DocumentChangeAction<Product>[]>((resolve, reject) => {
      this.productsRef.snapshotChanges()
        .subscribe(snapshot => {
          resolve(snapshot);
        })
    });  
 }

 create(product: Product): Promise<DocumentReference> {
   return this.productsRef.add({
     name: product.name,
     price: product.price,
     photoUrl: product.photoUrl,
     description: product.description
   });
 }

 update(id:string, store: Product): Promise<void> {
   return this.productsRef.doc(id).update(store);
 }

 delete(id: string) : Promise<void> {
   return this.productsRef.doc(id).delete();
 }
}
