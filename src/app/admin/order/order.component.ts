import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/model/order.model';
import { OrdersService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders : Order[] = [];
  order: Order;
  p: number = 1;
  constructor(private ordersService: OrdersService, private route: Router) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersService.getAllOrder().subscribe(res => {
      this.orders = res.map(item => {
        return {
          Id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Order
      })
    });
  }
  detailOrder(id: any){
    this.route.navigate(['dashboard/order/' + id])
  }
  deleteOrder(order: Order){
    if(window.confirm('Bạn có chắc muốn xóa hóa đơn có mã '+ order.id + '?')){
      this.ordersService.deleteOrder(order);
    }
    
  }
}
