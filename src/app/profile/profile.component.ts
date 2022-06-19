import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private parms: ActivatedRoute, private fs:AngularFirestore) { 
    this.parms.params.subscribe(query=>{
      return this.keyParams = query['key']
    })
  }

  dataUser={
    fullName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    image: '',
    isAdmin: false,
    status: false,
  } 
  keyParams: any;

  ngOnInit(): void {
    this.fs.collection('users').ref.doc(this.keyParams).get().then((data:any)=>{
    console.log(data.data())
    this.dataUser.fullName = data.data()['fullName']
    this.dataUser.image = data.data()['image']
    this.dataUser.email = data.data()['email']
    this.dataUser.password = data.data()['password']
    this.dataUser.address = data.data()['address']
    this.dataUser.phoneNumber = data.data()['phoneNumber']
    this.dataUser.isAdmin = data.data()['isAdmin']
    this.dataUser.status = data.data()['status']
  })
}
}
