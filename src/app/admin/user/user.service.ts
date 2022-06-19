import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { User } from "src/model/user.model";

@Injectable({
    providedIn: "root",
})

export class UserService{
    productCollection!: AngularFirestoreCollection<User>;

    constructor(private data: AngularFirestore){}

    //GetAll
    getAllUser(){
        return this.data.collection('/users').snapshotChanges();
    }
    updateUserService(user: User, payload: User){
        return this.data.collection('/users/' + user.id).doc(user.id).update(payload); 
    }
}