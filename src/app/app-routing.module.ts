import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { StoreFullInfoComponent } from './components/store-full-info/store-full-info.component';

const routes: Routes = [
  {
    path:'auth', 
    children : [
      { path:'sign-in', component: SignInComponent },
      { path:'register-user', component: SignUpComponent }
    ]
  },
  { 
    path: 'dashboard', component: MainLayoutComponent,
    children: [
      { path: 'store/list', component: StoresListComponent },
      { path: 'store/add', component: StoreCreateComponent },
      { path: 'store/fullInfo', component:  StoreFullInfoComponent},
      { path: 'product/list', component: ProductListComponent },
      { path: 'product/add', component: ProductCreateComponent },
      { path:'user-info', component: ProfileInfoComponent },
    ]
  },
  { path: '', redirectTo: '/dashboard/user-info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
