import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/model/category.model';
import { CategoriesService } from './category.service';
import { AngularFireStorage} from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  imgSrc : string = '/assets/icons/account.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  cateList : Category[] = [];
  cateUpdateForm!: FormGroup;
  cateObj : Category = {
    title: '',
    image: '',
    desc: ''
  }
  id : string = '';
  title : string = '';
  image : string = '';
  desc : string = '';
  imageUrl: string = '';
  p: number = 1;
  editState: boolean = false;

  constructor(private data: CategoriesService, private storage: AngularFireStorage, private route: Router){}

  ngOnInit(): void {
    this.getAllCate();
  }
  //getAll
  getAllCate(){
    this.data.getAllCate().subscribe(res=>{

      this.cateList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error');
    })
  }

  addCate(categoryForm: NgForm){
    if(this.title == '' || this.desc == ''){
      alert('title ord description can be null')
    }
    this.cateObj.id = ''
    this.cateObj.title = this.title;
    this.cateObj.desc = this.desc;
    if(categoryForm.value!=null){
      var filePath = `${'food'}/${this.title}/${this.selectedImage.name}_${new Date().getTime()}`
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            this.cateObj.image = url;
            this.data.addCate(this.cateObj);
          })
        })
      ).subscribe();
    } 
   
    this.resetForm();
  }

  updateCate(categoryUpdateForm: NgForm){
    this.data.updateCate(this.id, categoryUpdateForm.value);
    this.resetForm();
  }
  DetailCategory(id: any){
    this.route.navigate(['dashboard/category/'+id])
  }
  deleteCate(cate: Category){
    if(window.confirm('Are you sure you want delete Category '+ cate.title + '?')){
      this.data.deleteCate(cate);
    }
    
  }

  resetForm(){
    this.id = '';
    this.title = '';
    this.image = '';
    this.desc = '';
    this.image = '';
  }
  
  titleEdit : string = '';
  imageEdit : string = '';
  descEdit : string = '';
  onEdit(cate: any) {
    this.titleEdit = cate.title;
    this.imageEdit = cate.image
    this.descEdit = cate.desc;
    this.cateUpdateForm.setValue({
      titleEdit: cate.title,
      imageEdit: cate.image,
      descEdit: cate.desc
    })
    // this.airportUpdateForm.controls['IATA'].setValue(air.IATA);
    // this.airportUpdateForm.controls['Name'].setValue(air.Name);
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
  // loadedCategories:Category[] = [];
  // isFetching = false;

  // constructor(private http: HttpClient, private categoriesService: CategoriesService) { }
  // onCreateCategory(categoryData: {title: string, desc: string}){
  //   this.categoriesService.createAndStoreCategories(categoryData);
  // }

  // ngOnInit() {
  //   this.isFetching =true;
  //   this.categoriesService.fetchCategory().subscribe((categories) => {
  //     this.isFetching = false;
  //     this.loadedCategories = categories;
  //   })
  // }
  // error = null;
  
  
  // onFetchCategory(){
  //   this.isFetching =true;
  //   this.categoriesService.fetchCategory().subscribe((categories) => {
  //     this.isFetching = false;
  //     this.loadedCategories = categories;
  //   }, error => {
  //     this.error = error.message;
  //     console.log(error);
  //   }
  //   )
  // }
  // onClearCategory(){
  //   this.categoriesService.deleteCategories().subscribe(() => {
  //     this.loadedCategories = [];
  //   })
  // }
  // onDelete(index: any) {
  //   this.categoriesService.deleteCateById(this.loadedCategories[index].id).subscribe(() => {
  //     alert('Delete success')
  //   }
  //   );
  // }
  // onUpdate(index: any) {
  //   this.categoriesService.updateCategory(this.loadedCategories[index].id).subscribe(() => {
      
  //     alert('Update success')
  //   });
  // }
  
}
