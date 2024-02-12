import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {

isSellerLogedin =new BehaviorSubject<boolean>(false)
isloginError= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }

  reloadSeller(){
    if( localStorage.getItem('seller')){
      this.isSellerLogedin.next(true)
      this.router.navigate(['/seller-home'])
    }
   
  }

    UserSignUP(body:signUp){
      this.http.post(`http://localhost:3000/seller`,body,{observe:'response'}).subscribe(res=>{
        this.isSellerLogedin.next(true)
        localStorage.setItem('seller',JSON.stringify(res.body))
        this.router.navigate(['seller-home'])

      })

    
  }

  loginUser(body:Login){
    return this.http.get(`http://localhost:3000/seller?email=${body.email}&password=${body.password}`,{observe:'response'}).subscribe((res:any)=>{
      if(res && res.body && res.body.length){
        console.log('login in successfully')
        localStorage.setItem('seller',JSON.stringify(res.body))
        this.router.navigate(['seller-home'])
        
      }else{
        console.log('email or password is not correct')
        this.isloginError.emit(true)
       
      }
    })
  
}
}
