import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private dbPath = '/stores';
  storesRef: AngularFirestoreCollection<Store> = null;


  constructor(private afs: AngularFirestore) {
    this.storesRef = afs.collection(this.dbPath);
  }

   getAll(): AngularFirestoreCollection<Store> {
     
      return this.storesRef;
   }

   create(store: Store): Promise<DocumentReference> {
     this.afs
     return this.storesRef.add(store);
   }
   
   update(id:string, store: Store): Promise<void> {
     return this.storesRef.doc(id).update(store);
   }

   delete(id: string) : Promise<void> {
     return this.storesRef.doc(id).delete();
   }




}
