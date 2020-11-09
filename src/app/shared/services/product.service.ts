import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  productRef : AngularFirestoreCollection<Product> = null;

  constructor(private afs: AngularFirestore) {
    this.productRef = afs.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<Product> {
     
    return this.productRef;
 }

 create(product: Product): Promise<DocumentReference> {
   return this.productRef.add(product);
 }
 
 update(id:string, store: Product): Promise<void> {
   return this.productRef.doc(id).update(store);
 }

 delete(id: string) : Promise<void> {
   return this.productRef.doc(id).delete();
 }
}
