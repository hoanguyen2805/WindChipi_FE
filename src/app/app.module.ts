import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Module của ngx-bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
// Service
import { CategoriesService } from './service/categories.service';
import { AuthService } from './service/auth.service';
import { TokenInterceptorService } from './service/interceptor.service';
import { UsersService } from './service/user.service';
import { ContactService } from './service/contact.service';
import { ProductService } from './service/product.service';
import { CommentService } from './service/comment.service';
import { OrderService } from './service/order.servive';
//guard
import { SignInSignUpGuard } from './guards/signin-signup.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthUserGuard } from './guards/auth-user.guard';
// Component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { CategoriesComponent } from './categories/categories.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    AccountComponent,
    RegisterComponent,
    ContactComponent,
    CategoriesComponent,
    DetailProductComponent,
    AdminComponent,
    UserManagementComponent,
    ProductManagementComponent,
    CategoryManagementComponent,
    ContactManagementComponent,
    SearchProductsComponent,
    CartComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [CategoriesService, AuthService, UsersService, ContactService, ProductService, CommentService, OrderService, SignInSignUpGuard, AuthAdminGuard, AuthUserGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
