import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
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
  
  getAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.productsRef.snapshotChanges()
        .subscribe(snapshot => {
          resolve(snapshot);
        })
    });  
 }

 create(product: Product): Promise<DocumentReference> {
   return this.productsRef.add(product);
 }
 
 update(id:string, store: Product): Promise<void> {
   return this.productsRef.doc(id).update(store);
 }

 delete(id: string) : Promise<void> {
   return this.productsRef.doc(id).delete();
 }
}
