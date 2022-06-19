import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-food',
  templateUrl: './detail-food.component.html',
  styleUrls: ['./detail-food.component.css']
})
export class DetailFoodComponent implements OnInit {

  dataFood={
    name: '',
    image: '',
    desc: '',
    category: '',
    quantity: 0,
    price: 0,
    status: null,
    isHomePage: null
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
      this.dataFood.name = data.data()['name']
      this.dataFood.image = data.data()['image']
      this.dataFood.desc = data.data()['desc']
      this.dataFood.category = data.data()['category']
      this.dataFood.quantity = data.data()['quantity']
      this.dataFood.price = data.data()['price']
      this.dataFood.status = data.data()['status']
      this.dataFood.isHomePage = data.data()['isHomePage']
  })

}
}
