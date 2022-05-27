import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Food } from "src/model/food.model";

@Injectable({
    providedIn: "root",
})

export class FoodService{

    productCollection!: AngularFirestoreCollection<Food>;

    constructor(private data: AngularFirestore){}


    //Add product
    addFood(food: Food){
        food.id = this.data.createId();
        return this.data.collection('/Foods').add(food);
    }

    //GetAll
    getAllFood(){
        return this.data.collection('/Foods').snapshotChanges();
    }

    deleteFood(food: Food){
        return this.data.doc('/Foods/' + food.id).delete();
    }

    updateFood(FoodId: String, food: Food){
        return this.data.doc('/Foods/' + FoodId).update(food)
    }
}
