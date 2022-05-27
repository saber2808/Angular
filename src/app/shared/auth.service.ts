import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { User } from "src/model/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(private fireauth:AngularFireAuth, private router : Router, private firestore: AngularFirestore) {
        
        
    }

    //login
    login(email : string, password : string){
        this.fireauth.signInWithEmailAndPassword(email, password).then(()=>{
            localStorage.setItem('token','true');
            this.router.navigate(['home']);
        }, err => {
            alert(err.message);
            this.router.navigate(['/login']);
        })
    }
    //register
    register(email : string, password : string){
        this.fireauth.createUserWithEmailAndPassword(email, password).then(()=>{
            alert('Register success');
            this.router.navigate(['/login']);
        }, err =>{
            alert(err.message);
            this.router.navigate(['/register']);
        })
    }
    logout(){
        this.fireauth.signOut().then(()=>{
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
        }, err =>{
            alert(err.message);
        })
    }

    AddProfile(user: User){
        user.id = this.firestore.createId();
        return this.firestore.collection('/users').add(user);
    }

    getAllUsers(){
        return this.firestore.collection('/users').snapshotChanges();
    }
}