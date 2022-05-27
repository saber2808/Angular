export class User{
    id?: string;
    fullName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    image: string;
    constructor(fullName:string, email:string, password:string, address:string, phoneNumber:string, image: string){
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.image = image;
    }

}