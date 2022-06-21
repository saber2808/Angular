import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Category } from "src/model/category.model";

@Injectable({
    providedIn: "root",
})

export class CategoriesService {


    constructor(private data: AngularFirestore){}

    //Add product
    addCate(cate: Category){
        cate.id = this.data.createId();
        return this.data.collection('/Categories').add(cate);
    }

    //GetAll
    getAllCate(){
        return this.data.collection('/Categories').snapshotChanges();
    }

    deleteCate(cate: Category){
        return this.data.doc('/Categories/' + cate.id).delete();
    }

    updateCate(CategoryId: String, cate: Category){
        //return this.http.patch(`https://flightreservation-31cca-default-rtdb.asia-southeast1.firebasedatabase.app/airports/${AirportId}.json`,
        return this.data.doc('/Categories/' + CategoryId).update(cate)
    }
}