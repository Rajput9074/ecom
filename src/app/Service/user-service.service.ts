import { EventEmitter, Injectable } from '@angular/core';
import { Login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient,private router:Router) { }

  isSellerLogedin =new BehaviorSubject<boolean>(false)
  isloginError= new EventEmitter<boolean>(false)
  UserSignUP(body:signUp){
    this.http.post(`http://localhost:3000/user`,body,{observe:'response'}).subscribe(res=>{
      this.isSellerLogedin.next(true)
      localStorage.setItem('user',JSON.stringify(res.body))
      this.router.navigate(['/'])

    })

  
}

reloadUser(){
  if(localStorage.getItem('user')){
      this.router.navigate(['/user'])
  }
}

loginUser(body:Login){
  return this.http.get(`http://localhost:3000/user?email=${body.email}&password=${body.password}`,{observe:'response'}).subscribe((res:any)=>{
    if(res && res.body && res.body.length){
      console.log('login in successfully')
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.router.navigate(['/'])
      
    }else{
      console.log('email or password is not correct')
      this.isloginError.emit(true)
     
    }
  })

}
}
