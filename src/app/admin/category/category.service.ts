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
    // category: Category[] = [];
    // cate: Category = {
    //     id: '',
    //     title: '',
    //     desc: ''
    // };
    // id: string = '';
    // title: string = '';
    // desc: string = '';
    // constructor(private http: HttpClient) { }
    //     createAndStoreCategories(categoryData: Category) {
    //     // Send Http request
    //         this.http.post<{ name: string }>("https://angular-6d94e-default-rtdb.firebaseio.com/category.json", categoryData).subscribe((responseData) => {
    //             console.log(responseData);
    //         });
    //     }
    //     fetchCategory(){
    //         return this.http.get<{[key:string]:Category}>("https://angular-6d94e-default-rtdb.firebaseio.com/category.json").pipe(map(responseData=>{
    //         const postsArray:Category[] = [];
    //         for(const key in responseData){
    //             if(responseData.hasOwnProperty(key)){
    //             postsArray.push({...responseData[key], id:key});
    //             }
    //         }
    //         return postsArray;
    //         }));
    //     };
    //     deleteCategories() {
    //         return this.http.delete("https://angular-6d94e-default-rtdb.firebaseio.com/category.json");
    //     }
        
    //     deleteCateById(CategoryId: any) {
    //         return this.http.delete(`https://angular-6d94e-default-rtdb.firebaseio.com/category/${CategoryId}.json`);
    //     }
       
    //     updateCategory(CategoryId: any) {
    //             return this.http.patch(`https://angular-6d94e-default-rtdb.firebaseio.com/category/${CategoryId}.json`, {title: this.cate.title = this.title, desc: this.cate.desc = this.desc});
    //         }
        
    }