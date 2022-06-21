import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './admin/category/category.component';
import { DetailCategoryComponent } from './admin/category/detail-category/detail-category.component';
import { DetailFoodComponent } from './admin/food/detail-food/detail-food.component';
import { EditFoodComponent } from './admin/food/edit-food/edit-food.component';
import { FoodComponent } from './admin/food/food.component';
import { DetailOrderComponent } from './admin/order/detail-order/detail-order.component';
import { OrderComponent } from './admin/order/order.component';
import { CreateUserComponent } from './admin/user/create-user/create-user.component';
import { DetailUserComponent } from './admin/user/detail-user/detail-user.component';
import { UserComponent } from './admin/user/user.component';
import { VoucherComponent } from './admin/voucher/voucher.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'menu', component: MenuComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, children:[
    {path: 'category', component: CategoryComponent},
    {path: 'category/:key', component: DetailCategoryComponent},
    {path: 'food', component: FoodComponent},
    {path: 'food/edit/:key', component: EditFoodComponent},
    {path: 'food/:key', component: DetailFoodComponent},
    {path: 'user', component: UserComponent},
    {path: 'createuser', component: CreateUserComponent},
    {path: 'user/:key', component: DetailUserComponent},
    {path: 'voucher', component: VoucherComponent},
    {path: 'order', component: OrderComponent},
    {path: 'order/:key', component: DetailOrderComponent},

  ]},
  {path: 'cart', component: CartComponent},
  {path: 'checkoutsuccess', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
