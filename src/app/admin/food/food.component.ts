import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Food } from 'src/model/food.model';
import { FoodService } from './food.service';
import { AngularFireStorage} from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';
import { CategoriesService } from '../category/category.service';
import { Category } from 'src/model/category.model';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  imgSrc : string = '/assets/icons/food.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  foodList : Food[] = [];
  cateList : Category[] = [];
  foodUpdateForm!: FormGroup;
  foodObj : Food = {
    name: '',
    image: '',
    desc: '',
    category: '',
    quantity: 0,
    price: 0,
    status: false,
    isHomePage: false
  }
  id : string = '';
  name : string = '';
  image : string = '';
  desc : string = '';
  category: string = '';
  quantity: number = 0;
  price: number = 0;
  status: boolean = false;
  isHomePage: boolean = false;
  HeadElement = ['Hình ảnh', 'Tên món', 'Mô tả', 'Phân loại', 'Tình trạng', 'Trending', 'Tùy chọn']
  editState: boolean = false;
  p: number = 1;

  constructor(private route: Router,private data: FoodService, private storage: AngularFireStorage, private dataCate: CategoriesService, private toast: NgToastService){}

  ngOnInit(): void {
    this.getAllFood();
    this.getAllCate();
  }
  //getAll
  getAllFood(){
    this.data.getAllFood().subscribe(res=>{

      this.foodList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error');
    })
  }

  addFood(foodForm: NgForm){
    if(this.name == '' || this.desc == '' || this.quantity == 0 || this.price == 0){
      alert('title or description can not be null and quantity or price can not be 0')
    }
    this.foodObj.id = ''
    this.foodObj.name = this.name;
    this.foodObj.desc = this.desc;
    this.foodObj.category = this.category;
    this.foodObj.quantity = this.quantity;
    this.foodObj.price = this.price;
    this.foodObj.status = this.status;
    this.foodObj.isHomePage = this.isHomePage;
      
    
    this.isSubmitted = true;
    if(foodForm.value!=null){
      var filePath = `${'food'}/${this.category}/${this.name}/${this.selectedImage.name}_${new Date().getTime()}`
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            this.foodObj.image = url;
            this.data.addFood(this.foodObj);
            this.toast.success({detail:"Added Product", summary:"Thêm sản phẩm " + this.foodObj.name + " thành công!", duration:3000})
          })
        })
      ).subscribe();
    } 
 
    this.resetForm();
  }

  updateFood(foodUpdateForm: NgForm){
    // if(foodUpdateForm.value!=null){
    //   var filePath = `${'food'}/${this.category}/${this.name}/${this.selectedImage.name}_${new Date().getTime()}`
    //   const fileRef = this.storage.ref(filePath);
    //   this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
    //     finalize(()=>{
    //       fileRef.getDownloadURL().subscribe((url)=>{
    //         this.foodObj.image = url;
            
    //       })
    //     })
    //   ).subscribe();
    // }
    this.data.updateFood(foodUpdateForm.value);
    foodUpdateForm.reset();
    this.toast.info({detail:"UpdateProduct success", summary:"Cập nhật sản phẩm " + this.foodObj.name + " thành công!", duration:3000})
  }

  deleteFood(food: Food){
    if(window.confirm('Are you sure you want delete Food '+ food.name + '?')){
      this.data.deleteFood(food);
      this.toast.warning({detail:"Delete Product", summary:"Xóa sản phẩm " + this.foodObj.name + " thành công!", duration:3000})
    }
    
  }
  detailFood(id: any){
    this.route.navigate(['dashboard/food/'+id])
  }
  editPageFood(id: any){
    this.route.navigate(['dashboard/food/edit/'+id])
  }
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

  resetForm(){
    this.name = '';
    this.image = '';
    this.desc = '';
    this.quantity = 0;
    this.price = 0;
    this.status = false;
    this.isHomePage = false;
  }
  idEdit : string = '';
  nameEdit : string = '';
  imageEdit : string = '';
  descEdit : string = '';
  categoryEdit: string = '';
  quantityEdit: number = 0;
  priceEdit: number = 0;
  statusFoodEdit: boolean = false;
  isHomePageEdit: boolean = false;
  onEdit(food: any) {
    this.nameEdit = food.name;
    this.imageEdit = food.image;
    this.descEdit = food.desc;
    this.categoryEdit = food.category;
    this.quantityEdit = food.quantity;
    this.priceEdit = food.price;
    this.statusFoodEdit = food.status;
    this.isHomePageEdit = food.isHomePage;
    this.foodUpdateForm.setValue({
      nameEdit: food.name,
      descEdit: food.desc,
      categoryEdit: food.category,
      quantityEdit: food.quantity,
      priceEdit: food.price,
      imageEdit: food.image,
      statusFoodEdit: food.status,
      isHomePageEdit: food.isHomePage
    })
    console.log(this.foodUpdateForm.value);
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
  key: string = 'Price'
  reverse: boolean = false;
  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse
  }


}
