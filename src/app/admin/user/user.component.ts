import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/model/user.model';
import { AngularFireStorage} from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  imgSrc : string = '/assets/icons/account.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;

  userList : User[] = [];
  userUpdateForm!: FormGroup;
  HeadElement = ['Thông tin người dùng', 'Thông tin giao hàng', 'Trạng thái tài khoản', 'Phân quyền', 'Tùy chọn']
  userObj : User = {
    id: '',
    fullName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    image: '',
    isAdmin: false,
    status: false,
  }
  id: string = '';
  fullName: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  phoneNumber: string = '';
  image: string = '';
  status: boolean = false;
  isAdmin: boolean = false;

  editState: boolean = false;
  constructor(private data: AuthService, private storage: AngularFireStorage, private route: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.data.getAllUsers().subscribe((res: any)=>{
      this.userList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error');
    })
  }
  detailUser(id: any){
    this.route.navigate(['dashboard/user/'+id])
  }
  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any)=>this.imgSrc= e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/icons/account.png';
      this.selectedImage = null;
    }
  }
  selectStatus: string = '';
  selectChangeHander(event: any){
    this.selectStatus = event.target.value;
  }
  onEdit(user: any) {
    this.id = user.id;
    this.fullName = user.fullName;
    this.image = user.image;
    this.email = user.email;
    this.address = user.address;
    this.phoneNumber = user.phoneNumber;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
    this.status = user.status;
    this.userUpdateForm.setValue({
      fullName: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      password: user.password,
      image: user.image,
      status: user.status,
      isAdmin: user.isAdmin
    })
  }
  // updateUser(user: User){
  //   let payload = user;
  //   user.fullName = this.userUpdateForm.value;
  //   user.email = this.userUpdateForm.value;
  //   user.address = this.userUpdateForm.value;
  //   user.isAdmin = this.userUpdateForm.value;
  //   user.phoneNumber = this.userUpdateForm.value;
  //   user.status = this.userUpdateForm.value;
  //   this.userService.updateUserService(user, payload).then((result)=>{
  //     console.log("success");
  //   },(error)=>console.log("error"));
  // }
}
