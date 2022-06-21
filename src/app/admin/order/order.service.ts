import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from "rxjs";
import { Order } from "src/model/order.model";

@Injectable({
    providedIn: "root",
})
export class OrdersService {
    orderCollection!: AngularFirestoreCollection<Order>;
    orders: Order[] = [];
    constructor(private db: AngularFirestore){
        this.orderCollection = this.db.collection('Orders');
        this.orderCollection.snapshotChanges().pipe(map(res=>{
            return res.map((e: any)=>{
                const data = e.payload.doc.data() as Order;
                data.id = e.payload.doc.id;
                return data
            })
        })).subscribe((data)=>{
            this.orders = data;
        });
        this.getAllOrder();
    }



    //GetAll
    getAllOrder(){
        return this.orderCollection.snapshotChanges();
    }

    deleteOrder(order: Order){
        return this.orderCollection.doc(order.id).delete();
    }
}