import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Voucher } from 'src/model/voucher.model';
import { VoucherService } from './voucher.service';
import { AngularFireStorage} from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  imgSrc : string = '/assets/icons/Voucher.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  p: number = 1;
  voucherList : Voucher[] = [];
  voucherUpdateForm!: FormGroup;
  voucherObj : Voucher = {
    name: '',
    image: '',
    desc: '',
    quantity: 0,
    discount: 0
  }
  id : string = '';
  name : string = '';
  image : string = '';
  desc : string = '';
  quantity: number = 0;
  discount: number = 0;

  editState: boolean = false;

  constructor(private route: Router,private data: VoucherService, private storage: AngularFireStorage){}

  ngOnInit(): void {
    this.getAllVoucher();
  }
  //getAll
  getAllVoucher(){
    this.data.getAllVoucher().subscribe(res=>{

      this.voucherList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id; 
        return data;
      })
    }, err => {
      alert('Error');
    })
  }

  addVoucher(voucherForm: NgForm){
    if(this.name == '' || this.desc == '' || this.quantity == 0 || this.discount == 0){
      alert('title or description can not be null and quantity or price can not be 0')
    }
    this.voucherObj.id = ''
    this.voucherObj.name = this.name;
    this.voucherObj.desc = this.desc;
    this.voucherObj.quantity = this.quantity;
    this.voucherObj.discount = this.discount;

    this.isSubmitted = true;
    if(voucherForm.value!=null){
      var filePath = `${'voucher'}/${this.name}/${this.selectedImage.name}_${new Date().getTime()}`
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            this.voucherObj.image = url;
            this.data.addVoucher(this.voucherObj);
          })
        })
      ).subscribe();
    } 
    this.resetForm();
  }

  updateVoucher(voucherForm: NgForm){
    this.data.updateVoucher(this.id, voucherForm.value);
    this.resetForm();
  }

  deleteVoucher(voucher: Voucher){
    if(window.confirm('Are you sure you want delete Food '+ voucher.name + '?')){
      this.data.deleteVoucher(voucher);
    }
    
  }
  DetailVoucher(id: any){
    this.route.navigate(['dashboard/food/'+id])
  }

  resetForm(){
    this.name = '';
    this.image = '';
    this.desc = '';
    this.quantity = 0;
    this.discount = 0;
  }
  onEdit(food: any) {
    this.id = food.id;
    this.name = food.name;
    this.desc = food.desc;
    this.quantity = food.quantity;
    this.discount = food.price;
    this.voucherUpdateForm.setValue({
      name: food.name,
      desc: food.desc,
      quantity: food.quantity,
      price: food.price,
      image: food.image
    })
  }
  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any)=>this.imgSrc= e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/icons/account.png';
      this.selectedImage = null;
    }
  }

}
