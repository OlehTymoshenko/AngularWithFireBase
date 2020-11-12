import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ImagesInFirestorageService } from 'src/app/shared/services/images-in-firestorage.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  PATH_TO_PRODUCTS_IMAGES_IN_STORAGE : string = 'products/images';

  addProductForm: FormGroup;
  isImageUploadingNow = false;
  imagePathInStorage = "";

  
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
    private imageService: ImagesInFirestorageService,
    private router: Router,
    private routeParams : ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  resetFields() {
    this.addProductForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    }) 

  }

  createForm() {
    this.addProductForm = this.fb.group({
      name: [ '', Validators.required ],
      price: [ '', Validators.required ],
      description: [ '', Validators.required ]
    });
  }

   fileChange(event) {
    let fileList : FileList = event.target.files;

    if(fileList.length > 0) {
      const file = fileList[0];
      this.isImageUploadingNow = true;
      this.imageService.uploadImage(file, this.PATH_TO_PRODUCTS_IMAGES_IN_STORAGE).then(async val => {
           this.imagePathInStorage = await val.ref.fullPath;
      }).finally(() => this.isImageUploadingNow = false);
    }
  }

  onSubmit(value: Product) {
    let storeId = this.routeParams.snapshot.paramMap.get('storeId');
    value.photoUrl = this.imagePathInStorage;
    this.productService.create(storeId, value)
      .then(
        res => {
          console.log('new product added successfully');
          this.resetFields();
          this.router.navigate(['/dashboard/store/fullInfo', storeId]);
        }
      );
  }

}
