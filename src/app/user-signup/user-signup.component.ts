import { Component } from '@angular/core';
import { Login, signUp } from '../data-type';
import { UserServiceService } from '../Service/user-service.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  showError:string=''
  constructor(private userService:UserServiceService){}
  ngOnInit(){
this.userService.reloadUser()
  }
  showLogin=false
  UserForm(data: signUp) {
    
    let obj = data
    this.userService.UserSignUP(obj)
  }

  openLoginPage(){
    this.showLogin=true
  }

  signUpPage(){
    this.showLogin=false 
  }

  userLoginForm(data: Login){
    let obj = data
    this.userService.loginUser(obj)
    this.userService.isloginError.subscribe(isError=>{
      if(isError){
        this.showError='email or password is not correct'
      }
    })
  }


}
