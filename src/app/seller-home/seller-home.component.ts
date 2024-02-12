import { Component } from '@angular/core';
import { ProductServiceService } from '../Service/product-service.service';
import { productData } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  deletIcon = faTrash
  editIcon = faEdit
  constructor(private productService: ProductServiceService) {

  }
  productList: undefined | productData[]

  ngOnInit() {
    this.getProduct()
  }

  getProduct() {
    this.productService.getProduct().subscribe(res => {
      if (res) {
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
        this.productList = products
      }
    })
  }

  deleteProduct(id: number) {

    this.productService.deleteProduct(id).subscribe(res => {
      if (res) {
        this.getProduct()
      }
    })
  }

  UpdateProduct(id: number) {


  }
}
