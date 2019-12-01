import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './root/products/products.component';
import {LoginComponent} from './login/login.component';

import {AuthGuardServiceService} from "./services/auth-guard-service.service";
import {AuthenticationService} from "./services/authentication.service";
import {EditUserComponent} from "./login/edit-user/edit-user.component";
import {RootComponent} from "./root/root.component";
import {GestionProductComponent} from "./gestion-product/gestion-product.component";
import {GestionCategoryComponent} from "./gestion-category/gestion-category.component";
import {GestionUserComponent} from "./gestion-user/gestion-user.component";

const routes: Routes = [

  {path:'',redirectTo:'acceuil',pathMatch:'full',resolve: {
      someKey: AuthenticationService
  }},
  {path:'login', component:LoginComponent},
  {path:'edit-user', component:EditUserComponent,canActivate: [AuthGuardServiceService]},
  {path:'gestion-product', component:GestionProductComponent,canActivate: [AuthGuardServiceService]},
  {path:'gestion-category', component:GestionCategoryComponent,canActivate: [AuthGuardServiceService]},
  {path:'gestion-user', component:GestionUserComponent,canActivate: [AuthGuardServiceService]},
  {path:'acceuil', component:RootComponent,
    children:[
      {path:'',redirectTo:'products/1/0',pathMatch:'full'},
      {path:'products/:p1/:p2',component:ProductsComponent},
    ],canActivate: [AuthGuardServiceService]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

