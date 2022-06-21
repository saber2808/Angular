export class Order{
    id: string;
    emailUser: string;
    nameUser: string
    totalOrder: number;
    address: string;
    phoneNumber: string;
    status: boolean;

    
    constructor(id: string, emailUser:string, nameUser: string, totalOrder: number, address: string, phoneNumber: string, status: boolean){
        this.id = id;
        this.emailUser = emailUser;
        this.nameUser = nameUser;
        this.totalOrder = totalOrder;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.status = status;
    }
}