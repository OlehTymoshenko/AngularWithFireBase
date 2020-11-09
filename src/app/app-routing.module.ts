import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

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
      { path:'user-info', component: ProfileInfoComponent }
    ]
  },
  { path: '', redirectTo: '/dashboard/user-info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
