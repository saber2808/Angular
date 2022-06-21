import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Order } from 'src/model/order.model';
import { CartService } from './cart.service';
import { CheckoutService } from './checkout/checkout.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public foods: any = [];
  public grandTotal!: number;
  paymentHandler:any = null;
  success:boolean = false
  failure:boolean = false
  constructor(private cartService: CartService, private checkout: CheckoutService, private routing: Router ,private route: ActivatedRoute, private toast: NgToastService) { 
    
  }
  
  orderForm!: FormGroup;
  orderObj : Order = {
    id: '',
    date: '',
    emailUser: '',
    nameUser: '',
    totalOrder: 0,
    address: '',
    phoneNumber: '',
    status: false,
  }
  id: string = '';
  emailUser: string = '';
  nameUser: string = '';
  totalOrder: number = 0;
  address: string = '';
  phoneNumber: string = '';
  status: boolean = false;

  ngOnInit(): void {
    this.invokeStripe();
    this.cartService.getProducts().subscribe(res=>{
      this.foods = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })  
  }
  
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptyCart(){
    this.cartService.removeAllCart();
  }
  makePayment(grandTotal: number){
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key:'pk_test_51L8xcgHalZvwhJhB0VbkdC9uhb298NNfqeqG1T4hbCbW6Fe5vCvgpSeVwTkeH6cFUx4MKoM84y0pO7YuvDmdcnNG006alGpuK3',
      locale: 'auto',
      token: function(stripeToken:any){
        console.log(stripeToken)
        paymentStripe(stripeToken)
      } 
    })
    const paymentStripe = (stripeToken:any) => {
      this.checkout.makePayment(stripeToken).subscribe((data:any)=>{
        console.log(data)

        if(data.data === "success"){
          this.success = true
          this.routing.navigate(['/home']);
          this.toast.success({detail:"Thanh toán thành công", summary:"Chúc mừng bạn đã thanh toán đơn hàng thành công!", duration:3000})
        }else{
          this.failure = true
        }
      })
    }
    paymentHandler.open({
      name:"Hóa đơn",
      description:"detail",
      amount: grandTotal,
      currency: "VND",
    })
    this.addOrder(this.orderForm.value);
    this.emptyCart();
  }
  invokeStripe(){
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L8xcgHalZvwhJhB0VbkdC9uhb298NNfqeqG1T4hbCbW6Fe5vCvgpSeVwTkeH6cFUx4MKoM84y0pO7YuvDmdcnNG006alGpuK3',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  CheckoutPaypal(grandTotal: number){
    grandTotal = grandTotal/23000
    render({
      id: "#myPaypalButtons",
      currency: "USD",
      value: Math.ceil(grandTotal).toString(),
      onApprove: (details) =>{
        
      }
    })
    this.addOrder(this.orderForm.value);
    this.emptyCart();
    this.toast.success({detail:"Thanh toán thành công", summary:"Chúc mừng bạn đã thanh toán đơn hàng thành công!", duration:3000})
  }
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  addOrder(orderForm: NgForm){
    if(this.emailUser == '' || this.nameUser == '' || this.phoneNumber == '' || this.address == '0'){
      alert('not null')
    }
    this.orderObj.id = ''
    this.orderObj.date = Date.now().toString();
    this.orderObj.emailUser = this.emailUser;
    this.orderObj.nameUser = this.nameUser;
    this.orderObj.totalOrder = this.totalOrder;
    this.orderObj.phoneNumber = this.phoneNumber;
    this.orderObj.address = this.address;
    this.orderObj.status = true;
    if(orderForm.value!=null){
      this.cartService.addOrder(this.orderObj);
    } 
  }
  infoOrder(){
    this.totalOrder = this.cartService.getTotalPrice();
    this.orderForm.setValue({
      totalOrder: this.cartService.getTotalPrice()
    })
  }
 
}
