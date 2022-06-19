import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Voucher } from "src/model/voucher.model";

@Injectable({
    providedIn: "root",
})

export class VoucherService{

    productCollection!: AngularFirestoreCollection<Voucher>;

    constructor(private data: AngularFirestore){}


    //Add product
    addVoucher(voucher: Voucher){
        voucher.id = this.data.createId();
        return this.data.collection('/Vouchers').add(voucher);
    }

    //GetAll
    getAllVoucher(){
        return this.data.collection('/Vouchers').snapshotChanges();
    }

    deleteVoucher(voucher: Voucher){
        return this.data.doc('/Vouchers/' + voucher.id).delete();
    }

    updateVoucher(VoucherId: String, voucher: Voucher){
        return this.data.doc('/Foods/' + VoucherId).update(voucher)
    }
}
