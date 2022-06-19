export class Food{
    id?: string;
    name: string;
    image: string
    desc: string;
    category: string;
    quantity: number;
    price: number;
    status: boolean;
    isHomePage: boolean;

    
    constructor(name:string, image: string,desc:string, category: string, quantity: number, price: number, status: boolean, isHomePage: boolean){
        this.name = name;
        this.image = image;
        this.desc = desc;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
        this.isHomePage = isHomePage;
    }
}