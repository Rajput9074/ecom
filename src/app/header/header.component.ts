import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../Service/product-service.service';
import { productData } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default'
  seller_name: string = ''
  user_name: string = ''
  searchResult:undefined | productData[]
  cardItems=0
  constructor(private router: Router, private productService: ProductServiceService) {

  }
  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      console.log(val)
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log('seller area')
          this.menuType = 'seller'
          let storedata = localStorage.getItem('seller')
          let data = storedata && JSON.parse(storedata)[0]
          this.seller_name = data.username
        }else if(localStorage.getItem('user') && val.url.includes('user')){
          this.menuType = 'user'
          let userStore=localStorage.getItem('user')
          let data= userStore  && JSON.parse(userStore)
          this.user_name =data.username
        } else {
          console.log('seller outside')
          this.menuType = 'default'
        }
      }

    })

    let cardData=localStorage.getItem('localCard')
    if(cardData){
      this.cardItems =JSON.parse(cardData).length
    }

    this.productService.cardData.subscribe(item=>{
      this.cardItems = item.length
    })
  }

  logout() {
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

  Userlogout(){
    localStorage.removeItem('user')
    this.router.navigate(['/user'])
  }


  searchValue(event: KeyboardEvent) {
    let element = event.target as HTMLInputElement
    this.productService.SearchProduct(element.value).subscribe(res => {
     if(res){
      if(res.length>5){
        res.length =5
      }
      this.searchResult=res
     }
    })
  }

  clearSearch(){
    this.searchResult=undefined
  }

}
