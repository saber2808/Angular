export class Category{
    id?: string;
    title: string;
    image: string
    desc: string;
    constructor(title:string, image: string,desc:string){
        this.title = title;
        this.image = image;
        this.desc = desc;
    }
}