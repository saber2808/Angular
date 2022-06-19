import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { Food } from 'src/model/food.model';
import { FoodService } from '../admin/food/food.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foodList : Food[] = [];
  constructor(private dataFood: FoodService, private cartService: CartService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getTrendingFood();
  }

  getTrendingFood(){
    // this.dataFood.getAllFood().subscribe((res:any)=>{
    //   this.foodList = res.map((e: any)=>{
    //     const data = e.payload.doc.data();
    //     data.id = e.payload.doc.id;
    //     return data;
    //   })
    //   this.foodList.forEach((a:any)=>{
    //     Object.assign(a,{quantity:1,total:a.price});
    //   })
    // })
    this.dataFood.getAllFood().pipe(
      map(changes => 
        changes.map(c => 
          { 
            const Id = c.payload.doc.id;
            const data = c.payload.doc.data() as Food 
            console.log(data);
            return {
              Id, ...data
            };

          }
        )
      )
    ).subscribe(res=>{
      res.map((e:any)=>{
        if(e.isHomePage == true)
        {
          this.foodList.push(e);
        }
      })
    })
    console.log(this.foodList);
  }
  addtocart(food: any){
    this.cartService.addtoCart(food);
    this.toast.success({detail:"Thêm vào giỏ", summary:"Đã thêm sản phẩm " + food.name + " vào giỏ hàng thành công", duration:3000})
  }
}
