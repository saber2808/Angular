import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { User } from "src/model/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    isLoggedIn: boolean = false; 
    constructor(private fireauth:AngularFireAuth, private router : Router, private firestore: AngularFirestore, private toast: NgToastService) {
    }
    
    //login
    async login(email : string, password : string){
        await this.fireauth.signInWithEmailAndPassword(email, password).then(res=>{
            localStorage.setItem('token','true');
            this.router.navigate(['home']);
            this.isLoggedIn = true;
            this.toast.success({detail:"Login Success", summary:"Đăng nhập thành công!", duration:5000})
        }, err => {
            this.toast.error({detail:"Login Fail", summary:err.message, duration:5000})
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
            this.router.navigate(['/menu']);
        }, err =>{
            alert(err.message);
        })
    }

    AddProfile(user: User){
        user.id = this.firestore.createId();
        user.isAdmin = false;
        user.status = true;
        return this.firestore.collection('/users').add(user);
    }
    CreateUser(user: User){
        user.id = this.firestore.createId();
        return this.firestore.collection('/users').add(user);
    }

    getAllUsers(){
        return this.firestore.collection('/users').snapshotChanges();
    }
}