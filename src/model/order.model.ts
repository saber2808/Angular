export class Order{
    id: string;
    date: string;
    emailUser: string;
    nameUser: string
    totalOrder: number;
    address: string;
    phoneNumber: string;
    status: boolean;

    
    constructor(id: string, date: string,emailUser:string, nameUser: string, totalOrder: number, address: string, phoneNumber: string, status: boolean){
        this.id = id;
        this.date = date;
        this.emailUser = emailUser;
        this.nameUser = nameUser;
        this.totalOrder = totalOrder;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.status = status;
    }
}