import { Component, OnInit } from '@angular/core';
import { Food } from 'src/model/food.model';
import { Category } from 'src/model/category.model';
import { FoodService } from '../admin/food/food.service';
import { CategoriesService } from '../admin/category/category.service';
import { CartService } from '../cart/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  p: number = 1;
  cateList : Category[] = [];
  public filterCategory: any;
  foodList : Food[] = [];
  searchKey: string = "";
  public searchTerm: string = '';
  constructor(private dataFood: FoodService, private dataCate: CategoriesService, private cartService: CartService, private toast: NgToastService) { }



  getAllFood(){
    this.dataFood.getAllFood().subscribe((res:any)=>{
      this.filterCategory = res;
      this.foodList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
      this.foodList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    })
  }
  getAllCate(){
    this.dataCate.getAllCate().subscribe((res:any)=>{
      this.cateList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error');
    })
  }
  ngOnInit(): void {
    this.getAllFood();
    this.getAllCate();
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(food: any){
    this.cartService.addtoCart(food);
    this.toast.success({detail:"Thêm vào giỏ", summary:"Đã thêm sản phẩm " + food.name + " vào giỏ hàng thành công", duration:1000})
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm)
    this.cartService.search.next(this.searchTerm);
  }
  filter(category: string){
    this.filterCategory = this.foodList.filter((a:any)=>{
      if(a.category == category || category == ''){
        return a;
      }
    })
  }

}
