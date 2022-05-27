import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Category } from 'src/model/category.model';
import { CategoriesService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

 
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

  editState: boolean = false;

  constructor(private data: CategoriesService){}

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

  addCate(){
    if(this.title == '' || this.desc == ''){
      alert('title ord description can be null')
    }
    this.cateObj.id = ''
    this.cateObj.title = this.title;
    this.cateObj.desc = this.desc;

    this.data.addCate(this.cateObj);
    this.resetForm();
  }

  updateCate(categoryForm: NgForm){
    this.data.updateCate(this.id, categoryForm.value);
    this.resetForm();
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
  }
  onEdit(cate: any) {
    this.id = cate.id;
    this.title = cate.title;
    this.desc = cate.desc;
    this.cateUpdateForm.setValue({
      title: cate.title,
      desc: cate.desc
    })
    // this.airportUpdateForm.controls['IATA'].setValue(air.IATA);
    // this.airportUpdateForm.controls['Name'].setValue(air.Name);
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
