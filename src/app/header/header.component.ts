import { Component, OnInit } from '@angular/core';
import { Category } from 'src/model/category.model';
import { CategoriesService } from '../admin/category/category.service';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cateList : Category[] = [];
  logoutcheck: boolean = false;
  public totalItem: number = 0;
  isLoggedIn: boolean = false;

  constructor(private dataCate: CategoriesService, private auth : AuthService, private cartService: CartService, private route: Router) { }


  getAllCate(){
    this.dataCate.getAllCate().subscribe(res=>{

      this.cateList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error');
    })
  }
  logout(){
    this.auth.logout();
    this.logoutcheck = true
  }
  ngOnInit(): void {
    this.getAllCate();
    this.cartService.getProducts().subscribe(res=>{
      this.totalItem = res.length;
    })
    if(localStorage.getItem('token')!=null)
    {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn)
    }
    else{
      this.isLoggedIn = false;
      console.log(this.isLoggedIn)
    }
  }
  profile(id: any){
    this.route.navigate(['account/'+id])
  }

 
}
export class NgbdDropdownBasic {
    
}
