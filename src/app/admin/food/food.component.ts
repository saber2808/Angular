import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Food } from 'src/model/food.model';
import { FoodService } from './food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foodList : Food[] = [];
  foodUpdateForm!: FormGroup;
  foodObj : Food = {
    name: '',
    image: '',
    desc: '',
    quantity: 0,
    price: 0
  }
  id : string = '';
  name : string = '';
  image : string = '';
  desc : string = '';
  quantity: number = 0;
  price: number = 0;

  editState: boolean = false;

  constructor(private data: FoodService){}

  ngOnInit(): void {
    this.getAllFood();
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

  addFood(){
    if(this.name == '' || this.desc == '' || this.quantity == 0 || this.price == 0){
      alert('title or description can not be null and quantity or price can not be 0')
    }
    this.foodObj.id = ''
    this.foodObj.name = this.name;
    this.foodObj.desc = this.desc;
    this.foodObj.quantity = this.quantity;
    this.foodObj.price = this.price;

    this.data.addFood(this.foodObj);
    this.resetForm();
  }

  updateFood(foodForm: NgForm){
    this.data.updateFood(this.id, foodForm.value);
    this.resetForm();
  }

  deleteFood(food: Food){
    if(window.confirm('Are you sure you want delete Food '+ food.name + '?')){
      this.data.deleteFood(food);
    }
    
  }

  resetForm(){
    this.name = '';
    this.image = '';
    this.desc = '';
    this.quantity = 0;
    this.price = 0;
  }
  onEdit(food: any) {
    this.id = food.id;
    this.name = food.name;
    this.desc = food.desc;
    this.quantity = food.quantity;
    this.price = food.price;
    this.foodUpdateForm.setValue({
      name: food.name,
      desc: food.desc,
      quantity: food.quantity,
      price: food.price,
      image: food.image
    })
  }

}
