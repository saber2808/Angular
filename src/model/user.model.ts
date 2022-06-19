export class User{
    id: string;
    fullName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    image: string;
    status: boolean;
    isAdmin: boolean;
    constructor(id: string, fullName:string, email:string, password:string, address:string, phoneNumber:string, image: string, status: boolean, isAdmin: boolean){
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.image = image;
        this.isAdmin = isAdmin
        this.status = status
    }

}