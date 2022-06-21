import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-voucher',
  templateUrl: './detail-voucher.component.html',
  styleUrls: ['./detail-voucher.component.css']
})
export class DetailVoucherComponent implements OnInit {

  dataVoucher={
    name: '',
    image: '',
    desc: '',
    discount: '',
    quantity: 0,
  }
  keyParams: any;
  constructor(private parms: ActivatedRoute, private fs:AngularFirestore) { 
    this.parms.params.subscribe(query=>{
      return this.keyParams = query['key']
    })
  }

  ngOnInit(): void {
    this.fs.collection('Foods').ref.doc(this.keyParams).get().then((data:any)=>{
      console.log(data.data())
      this.dataVoucher.name = data.data()['name']
      this.dataVoucher.image = data.data()['image']
      this.dataVoucher.desc = data.data()['desc']
      this.dataVoucher.discount = data.data()['discount']
      this.dataVoucher.quantity = data.data()['quantity']
  })

}
}
