import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../Service/product-service.service';
import { productData } from '../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product_info: undefined | productData
  product_image: any
  removeCart=false
  constructor(private activateRoute: ActivatedRoute, private productService: ProductServiceService) { }
  ngOnInit() {


    let product_id = this.activateRoute.snapshot.paramMap.get('product_id')
    if (product_id) {
      this.productService.getProductById(product_id).subscribe(res => {
        if (res) {

          this.product_info = res
          this.product_image = typeof this.product_info === 'string' ? res.product_image : JSON.parse(res.product_image)

        let cardData= localStorage.getItem('localCard')  
       if(product_id && cardData){
        let items= JSON.parse(cardData)

        items= items.filter((item:productData)=>item.id.toString() == product_id)
        if(items.length>0){
          this.removeCart= true
        }else{
          this.removeCart=false
        }
       }

        }
      })
    }

  
  }

  quantity = 1
  add() {
    if (this.quantity < 10) {
      this.quantity++
    }
  }

  remove() {
    if (this.quantity > 0)
      this.quantity--

  }

  addToCard() {
    if(this.product_info){
      this.product_info.quantity= this.quantity
      if(!localStorage.getItem('user')){
        this.productService.localAddToCard(this.product_info)
         this.removeCart=true
      }

    }
  }
removeToCart(product_id:number){
  this.productService.removeToCart(product_id)
  this.removeCart=false

}


}
