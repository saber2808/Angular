export class Food{
    id?: string;
    name: string;
    image: string
    desc: string;
    quantity: number;
    price: number;

    
    constructor(name:string, image: string,desc:string, quantity: number, price: number){
        this.name = name;
        this.image = image;
        this.desc = desc;
        this.quantity = quantity;
        this.price = price;
    }
}