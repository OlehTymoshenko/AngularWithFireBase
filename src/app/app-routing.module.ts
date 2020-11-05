import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {path:'', redirectTo: '/sign-in', pathMatch: 'full'},
  {path:'sign-in', component: SignInComponent},
  {path:'register-user', component: SignUpComponent},
  {path:'user-info', component: ProfileInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
