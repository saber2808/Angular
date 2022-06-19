export class Voucher{
    id?: string;
    name: string;
    image: string
    desc: string;
    quantity: number;
    discount: number;

    
    constructor(name:string, image: string,desc:string, quantity: number, discount: number){
        this.name = name;
        this.image = image;
        this.desc = desc;
        this.quantity = quantity;
        this.discount = discount;
    }
}