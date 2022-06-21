import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/model/category.model';
import { Food } from 'src/model/food.model';
import { CategoriesService } from '../../category/category.service';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {

  imgSrc : string = '/assets/icons/food.png';
  foods: Food[];
  cates: Category[] = [];
  food: Food;
  Id: string;
  constructor(private foodService: FoodService, private route: ActivatedRoute, private cateService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllFoods();
    this.getAllCate();
  }
  getAllFoods() {
    this.foodService.getAllFood().subscribe(res => {
      this.foods = res.map(item => {
        return {
          Id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Food
      })
    });
  }

  getAllCate(){
    this.cateService.getAllCate().subscribe(res=>{

      this.cates = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error');
    })
  }
  updateFood(foodUpdateForm: NgForm) {
    this.foodService.updateFood(foodUpdateForm.value);
    foodUpdateForm.reset();
  }
  selectedImage: any = null;
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
}
