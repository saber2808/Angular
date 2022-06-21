import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FoodComponent } from './admin/food/food.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './admin/category/category.component';
import { HttpClientModule } from "@angular/common/http";
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './admin/user/user.component';
import {MatDialogModule} from '@angular/material/dialog';
import { VoucherComponent } from './admin/voucher/voucher.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FilterPipe } from './shared/filter.pipe';
import { NgToastModule } from 'ng-angular-popup';
import { DetailFoodComponent } from './admin/food/detail-food/detail-food.component';
import { DetailCategoryComponent } from './admin/category/detail-category/detail-category.component';
import { DetailUserComponent } from './admin/user/detail-user/detail-user.component';
import { CreateUserComponent } from './admin/user/create-user/create-user.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { EditFoodComponent } from './admin/food/edit-food/edit-food.component';
import { OrderComponent } from './admin/order/order.component';
import { DetailOrderComponent } from './admin/order/detail-order/detail-order.component';
import { DetailVoucherComponent } from './admin/voucher/detail-voucher/detail-voucher.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    FoodComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    CartComponent,
    UserComponent,
    VoucherComponent,
    CheckoutComponent,
    DashboardComponent,
    FilterPipe,
    DetailFoodComponent,
    DetailCategoryComponent,
    DetailUserComponent,
    CreateUserComponent,
    ProfileComponent,
    EditFoodComponent,
    OrderComponent,
    DetailOrderComponent,
    DetailVoucherComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    DropDownListModule,
    MatDialogModule,
    MDBBootstrapModule.forRoot(),
    NgToastModule,
    NgxPaginationModule,
    Ng2OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
