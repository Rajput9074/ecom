import { Component } from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { ProductServiceService } from '../Service/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  
  productForm: FormGroup | any;
  constructor(private fb:FormBuilder, private productService:ProductServiceService, private router: Router){

  }
  ngOnInit(){
   this.productForm= this.fb.group({
      'product_name':['',Validators.required],
      'product_price':['',Validators.required], 
      'product_category':['',Validators.required],
      'product_description':['',Validators.required],
      'product_image':['',Validators.required]
    })
  }

  selectedFile: File | null = null;
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.productForm.patchValue({ product_image: file });
    }
  }
  sellerProductForm(){
    console.log(this.productForm)
    let obj=this.productForm.value
    this.productService.addProduct(obj).subscribe(res=>{
      if(res){
        console.log(res)
        this.productForm.reset()
        this.router.navigate(['seller-home'])
      }
    })
  }

}
