import { Component } from '@angular/core';
import { Login, signUp } from '../data-type';
import { SellerServiceService } from '../Service/seller-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  showLogin=false
  showError=''
  constructor(private sellerService: SellerServiceService, private router: Router) {

  }
  ngOnInit() {
    this.sellerService.reloadSeller()
   } 

  sellFormMethod(data: signUp) {
    
    let obj = data
    this.sellerService.UserSignUP(obj)
  }

  sellLoginForm(data: Login){
    let obj = data
    this.sellerService.loginUser(obj)
    this.sellerService.isloginError.subscribe(isError=>{
      if(isError){
        this.showError='email or password is not correct'
      }
    })
  }

  openLoginPage(){
    this.showLogin=true
  }

  signUpPage(){
    this.showLogin=false 
  }

}