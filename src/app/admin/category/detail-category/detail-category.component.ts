import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {

  dataCategory={
    title: '',
    image: '',
    desc: ''
  }
  keyParams: any;
  constructor(private parms: ActivatedRoute, private fs:AngularFirestore ) { 
    this.parms.params.subscribe(query=>{
      return this.keyParams = query['key']
    })
  }

  ngOnInit(): void {
    this.fs.collection('Categories').ref.doc(this.keyParams).get().then((data:any)=>{
      console.log(data.data())
      this.dataCategory.title = data.data()['title']
      this.dataCategory.image = data.data()['image']
      this.dataCategory.desc = data.data()['desc']
  })
}
}
