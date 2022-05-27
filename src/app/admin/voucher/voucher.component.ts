import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Food } from 'src/model/food.model';
import { Voucher } from 'src/model/voucher.model';
import { VoucherService } from './voucher.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  voucherList : Voucher[] = [];
  voucherUpdateForm!: FormGroup;
  voucherObj : Voucher = {
    name: '',
    image: '',
    desc: '',
    quantity: 0,
    discount: 0
  }
  id : string = '';
  name : string = '';
  image : string = '';
  desc : string = '';
  quantity: number = 0;
  discount: number = 0;

  editState: boolean = false;

  constructor(private data: VoucherService){}

  ngOnInit(): void {
    this.getAllVoucher();
  }
  //getAll
  getAllVoucher(){
    this.data.getAllVoucher().subscribe(res=>{

      this.voucherList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error');
    })
  }

  addVoucher(){
    if(this.name == '' || this.desc == '' || this.quantity == 0 || this.discount == 0){
      alert('title or description can not be null and quantity or price can not be 0')
    }
    this.voucherObj.id = ''
    this.voucherObj.name = this.name;
    this.voucherObj.desc = this.desc;
    this.voucherObj.quantity = this.quantity;
    this.voucherObj.discount = this.discount;

    this.data.addVoucher(this.voucherObj);
    this.resetForm();
  }

  updateVoucher(voucherForm: NgForm){
    this.data.updateVoucher(this.id, voucherForm.value);
    this.resetForm();
  }

  deleteVoucher(voucher: Voucher){
    if(window.confirm('Are you sure you want delete Food '+ voucher.name + '?')){
      this.data.deleteVoucher(voucher);
    }
    
  }

  resetForm(){
    this.name = '';
    this.image = '';
    this.desc = '';
    this.quantity = 0;
    this.discount = 0;
  }
  onEdit(food: any) {
    this.id = food.id;
    this.name = food.name;
    this.desc = food.desc;
    this.quantity = food.quantity;
    this.discount = food.price;
    this.voucherUpdateForm.setValue({
      name: food.name,
      desc: food.desc,
      quantity: food.quantity,
      price: food.price,
      image: food.image
    })
  }

}
