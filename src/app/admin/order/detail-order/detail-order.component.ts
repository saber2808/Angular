import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {


  dataOrder={
    id: '',
    nameUser: '',
    emailUser: '',
    phoneNumber: '',
    address: '',
    totalOrder: 0,
    status: null
  }
  keyParams: any;
  constructor(private parms: ActivatedRoute, private fs:AngularFirestore) {
    this.parms.params.subscribe(query=>{
      return this.keyParams = query['key']
    })
   }

  ngOnInit(): void {
    this.fs.collection('Orders').ref.doc(this.keyParams).get().then((data:any)=>{
      console.log(data.data())
      this.dataOrder.id = data.data()['id']
      this.dataOrder.emailUser = data.data()['emailUser']
      this.dataOrder.nameUser = data.data()['nameUser']
      this.dataOrder.address = data.data()['address']
      this.dataOrder.phoneNumber = data.data()['phoneNumber']
      this.dataOrder.totalOrder = data.data()['totalOrder']
      this.dataOrder.status = data.data()['status']
  })
}
}
