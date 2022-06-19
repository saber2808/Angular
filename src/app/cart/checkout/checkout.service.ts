import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CheckoutService{

    constructor(private http:HttpClient){

    }
    //post request to server
    makePayment(stripeToken: any):Observable<any>{
        const url = "http://localhost:5000/checkout/"

        return this.http.post<any>(url,{
            token:stripeToken
        })
    }
}