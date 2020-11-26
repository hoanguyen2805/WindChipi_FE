import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guard
import { SignInSignUpGuard } from './guards/signin-signup.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthUserGuard } from './guards/auth-user.guard';

import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { CategoriesComponent } from './categories/categories.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [SignInSignUpGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthUserGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [SignInSignUpGuard]},
  {path: 'contact-us', component: ContactComponent},
  {path: 'categories/:id', component: CategoriesComponent},
  {path: 'detail-product/:id', component: DetailProductComponent},
  {
    path: 'admin', component: AdminComponent,
    children:[
      {path: 'users-management', component: UserManagementComponent},
      {path: 'products-management', component: ProductManagementComponent},
      {path: 'categories-management', component: CategoryManagementComponent},
      {path: 'contacts-management', component: ContactManagementComponent},
      {path: '', redirectTo: 'users-management', pathMatch: 'full'}
    ], canActivate: [AuthAdminGuard]
  },

  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
