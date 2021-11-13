import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationService } from './registration.service';
import { RegistrationComponent } from './registration/registration.component';
import { RequestformComponent } from './requestform/requestform.component';
import { RequestsuccessComponent } from './requestsuccess/requestsuccess.component';
import { VendorUpdateComponent } from './vendor-update/vendor-update.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'loginsuccess',component:LoginsuccessComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'user/:id',component:RequestformComponent},
  {path:'requests/:id',component:RequestsuccessComponent},
  {path:'vendors',component:VendorComponent},
  {path:'vendorupdate',component:VendorUpdateComponent},
  { path:'vendor/:id',component:VendorUpdateComponent},
  { path:'profile/:id',component:ProfileComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
