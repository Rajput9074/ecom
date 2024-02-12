import { Component } from '@angular/core';
import { ProductServiceService } from '../Service/product-service.service';
import { productData } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private productService:ProductServiceService){}
  ngOnInit(){
    this.getProduct()
  }

  productDetail:undefined | productData[]
  getProduct(){
    this.productService.getProduct().subscribe(res=>{
      if(res){
        console.log(res)

        let products = res.map(d => {

          let i
          if (typeof d.product_image === 'string' && d.product_image.startsWith('https://')) {
            i = d.product_image;
          } else {
            try {
              i = JSON.parse(d.product_image);
            } catch (error) {
              console.error('Invalid JSON:', error);
            }
          }
          d['product_image'] = i
          return d
        })
        this.productDetail = products
      }
    })
  }

}
