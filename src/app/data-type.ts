export interface signUp{

    username:String,
    email:String,
    password:string
}

export interface Login{
    email:string,
    password:string
}

export interface productData{
    target: EventTarget,
     id:number ,
    product_name:string,
    product_price:number,
    product_category:string,
    product_description:string,
    product_image:string,
    quantity:undefined | number

}