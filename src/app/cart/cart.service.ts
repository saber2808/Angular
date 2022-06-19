import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject } from "rxjs";
import { Order } from "src/model/order.model";

@Injectable({
    providedIn: 'root'
})
export class CartService{

    productCollection!: AngularFirestoreCollection<Order>;
    public cartItemList: any =[]
    public productList = new BehaviorSubject<any>([])
    public search = new BehaviorSubject<string>("");
    constructor(private data: AngularFirestore){}

    getProducts(){
       return this.productList.asObservable();
    }
    setProduct(food: any){
        this.cartItemList.push(...food);
        this.productList.next(food);
    }
    addtoCart(food: any){
        this.cartItemList.push(food);
        this.productList.next(this.cartItemList);
        this.getTotalPrice();
        console.log(this.cartItemList)
    }
    getTotalPrice():number{
        let grandTotal: number = 0;
        this.cartItemList.map((a:any)=>{
            grandTotal += a.total;
        })
        return grandTotal;
    }
    removeCartItem(food: any){
        this.cartItemList.map((a:any, index: any)=>{
            if(food.id===a.id){
                this.cartItemList.splice(index,1);
            }
        })
        this.productList.next(this.cartItemList);
    }
    removeAllCart(){
        this.cartItemList = []
        this.productList.next(this.cartItemList);
    }
    addOrder(order: Order){
        order.id = this.data.createId();
        return this.data.collection('/Orders').add(order);
    }

    //GetAll
    getAllOrder(){
        return this.data.collection('/Orders').snapshotChanges();
    }

}