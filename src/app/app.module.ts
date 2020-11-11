import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';


// Services
import { AuthService } from "./shared/services/auth.services";
import { StoreService } from './shared/services/store.service';
import { ProductService } from './shared/services/product.service';

// material
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { StoreFullInfoComponent } from './components/store-full-info/store-full-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ProfileInfoComponent,
    MainLayoutComponent,
    StoresListComponent,
    StoreCreateComponent,
    ProductCreateComponent,
    ProductListComponent,
    StoreFullInfoComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthService, StoreService, ProductService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
