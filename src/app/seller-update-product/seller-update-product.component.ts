import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../Service/product-service.service';
import { productData } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productFormUpdate: FormGroup | any
  productData :undefined | productData

  constructor(private fb :FormBuilder, private activatRoute:ActivatedRoute, private  productService: ProductServiceService, private router: Router){
    let product_id =this.activatRoute.snapshot.paramMap.get('id')
    console.log(product_id)
    product_id && this.productService.getProductById(product_id).subscribe(res=>{
      this.productData =res
      this.productFormUpdate.patchValue(this.productData)
    })
  }
  ngOnInit(){
    this.productFormUpdate= this.fb.group({
       'product_name':['',Validators.required],
       'product_price':['',Validators.required],
       'product_category':['',Validators.required],
       'product_description':['',Validators.required],
       'product_image':['',Validators.required]
     })
   }
 


  sellerProductUpdate(){
    let id=this.productData?.id
    let obj=this.productFormUpdate.value
    obj.id =id

    this.productService.updateProduct(obj).subscribe(res=>{
      if(res){
        console.log('product detail updated')
        this.router.navigate(['seller-home'])
      }
    })

  }

}
