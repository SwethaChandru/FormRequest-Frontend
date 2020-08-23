import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormComponent } from './components/form/form.component';
import { ViewComponent } from './components/view/view.component';
import {AuthGuardService} from './auth-guard.service';


const routes: Routes = [
  {path:'',component:NavbarComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'form',component:FormComponent,canActivate:[AuthGuardService]},
  {path:'view/:name',component:ViewComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[ AuthGuardService]
})
export class AppRoutingModule { }

export const routingComponents = [NavbarComponent,LoginComponent,SignupComponent,FormComponent,ViewComponent]
