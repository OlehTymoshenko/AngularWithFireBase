import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StoreService } from '../../shared/services/store.service';
import { Router } from '@angular/router';
import { Store } from 'src/app/shared/models/store';
import { DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit {

  items: DocumentChangeAction<Store>[];


  constructor(
    public storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.getAll()
      .then(
        (result) => {
          this.items = result;
        });
  }

  viewDetails(id: string) {

    this.router.navigate(['/dashboard/store/fullInfo', id])
  }

  addStore() {
    this.router.navigate(['/dashboard/store/add']);
  }

  

}
