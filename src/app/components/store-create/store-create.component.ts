import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StoreService } from '../../shared/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.css']
})
export class StoreCreateComponent implements OnInit {

  addStoreForm: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'address': [
      { type: 'required', message: 'Address name is required.' }
    ],
    'phoneNumber': [
      { type: 'required', message: 'Phone number is required.' }
    ]
  }

  constructor(
    private fb: FormBuilder,
    public storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    console.log('In ngOnInit')
  }

  resetFields() {
    this.addStoreForm = this.fb.group({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    }); 
  }

  createForm() {
    this.addStoreForm = this.fb.group({
      name: [ '', Validators.required ],
      address: [ '', Validators.required ],
      phoneNumber: [ '', Validators.required ]
    });
  }

  onSubmit(value) {
    this.storeService.create(value)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['/dashboard/store/list']);
        }
      )
  }

}
