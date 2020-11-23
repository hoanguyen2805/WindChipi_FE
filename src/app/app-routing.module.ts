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
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [SignInSignUpGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthUserGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [SignInSignUpGuard]},
  {path: 'contact-us', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
