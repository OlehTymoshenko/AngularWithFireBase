import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  addProductForm: FormGroup;
  
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'price': [
      { type: 'required', message: 'Price is required.' }
    ],
    'photoUrl': [
      { type: 'required', message: 'Product photo is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ]
  }


  constructor(
    public productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  resetFields() {
    this.addProductForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      photoUrl: new FormControl('', Validators.required)
    }) 

  }

  createForm() {
    this.addProductForm = this.fb.group({
      name: [ '', Validators.required ],
      price: [ '', Validators.required ],
      description: [ '', Validators.required ],
      photoUrl: ['', Validators.required]
    });
  }

  onSubmit(value) {
    this.productService

    // this.productService.create(value)
    //   .then(
    //     res => {
    //       this.resetFields();
    //       this.router.navigate(['/dashboard/product/list']);
    //     }
    //   );
  }

}
