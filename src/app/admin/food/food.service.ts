import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Food } from "src/model/food.model";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: "root",
})

export class FoodService {

   
    foodCollection!: AngularFirestoreCollection<Food>;
    foods: Food[] = [];
    constructor(private db: AngularFirestore){
        this.foodCollection = this.db.collection('Foods');
        this.foodCollection.snapshotChanges().pipe(map(res=>{
            return res.map((e: any)=>{
                const data = e.payload.doc.data() as Food;
                data.id = e.payload.doc.id;
                return data
            })
        })).subscribe((data)=>{
            this.foods = data;
        });
        this.getAllFood();
    }


    //Add product
    addFood(food: Food){
        food.id = this.db.createId();
        return this.db.collection('/Foods').add(food);
    }

    //GetAll
    getAllFood(){
        return this.foodCollection.snapshotChanges();
    }

    deleteFood(food: Food){
        return this.foodCollection.doc(food.id).delete();
    }

    updateFood(food: Food){
        return this.foodCollection.doc(food.id).update(food);
    }
    getFoodTrending(){
        return this.foodCollection.valueChanges()
    }
    
}
