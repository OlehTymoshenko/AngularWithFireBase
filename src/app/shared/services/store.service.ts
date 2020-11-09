import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
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

   getAll(): Promise<DocumentChangeAction<Store>[]> {
      return new Promise<DocumentChangeAction<Store>[]>((resolve, reject) => {
        this.storesRef.snapshotChanges()
          .subscribe(snapshot => {
            resolve(snapshot);
          })
      })
   }

   create(store: Store): Promise<DocumentReference> {
     return this.storesRef.add({
              name: store.name,
              address: store.address,
              phoneNumber: store.phoneNumber
     });
   }
   
   update(id:string, store: Store): Promise<void> {
     return this.storesRef.doc(id).update(store);
   }

   delete(id: string) : Promise<void> {
     return this.storesRef.doc(id).delete();
   }




}
