import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/model/user.model';
import { AngularFireStorage} from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';
import { url } from 'inspector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  imgSrc : string = '/assets/icons/account.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  user: User[] = [];
  
  id: string = '';
  fullName: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  phoneNumber: string = '';
  formTemplate = new FormGroup({
    image: new FormControl(''),
    id: new FormControl(''),
    fullName: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),

  })
  
  constructor(private auth : AuthService, private storage: AngularFireStorage ) { }

  ngOnInit(): void {
  }
  

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any)=>this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/icons/account.png';
      this.selectedImage = null;
    }
  }

  register(formTemplate: NgForm){
    
    if(formTemplate.value.email =='' || formTemplate.value.fullName == '' || formTemplate.value.phoneNumber == ''|| formTemplate.value.address == '' )
    {
      alert('please enter infomation user');
      return;
    }
    if(formTemplate.value.password=='')
    {
      alert('please enter password');
      return;
    } 
    this.auth.register(formTemplate.value.email, formTemplate.value.password);
    // this.userObj.id = '';
    // this.userObj.email = formTemplate.value.email;
    // this.userObj.fullName = formTemplate.value.fullName;
    // this.userObj.password = formTemplate.value.password;
    // this.userObj.phoneNumber = formTemplate.value.password;

    this.auth.AddProfile(formTemplate.value);
  }
  formControls(){
    return this.formTemplate['controls']
  }
  onsubmit(formTemplate: NgForm){
    var test = formTemplate.value.email;
    this.isSubmitted = true;
      if(this.formTemplate.valid){
        var filePath = `${formTemplate.value.email}/${this.selectedImage.name}_${new Date().getTime()}`
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe((url)=>{
              formTemplate.value.imageUrl = url;
              this.register(formTemplate);
            })
          })
        ).subscribe();
      } 
  }
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      image: ''
    })
  }

}
