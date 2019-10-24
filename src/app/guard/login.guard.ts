import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate  {
  
  constructor(
    private auth:AuthService,
    private router:Router
  ){}

//função para quando um usuário estiver logado ele seja redirecionado para a home
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.auth.getAuth().onAuthStateChanged(user => {
        if(user) this.router.navigate(['home']);
 
        resolve(!user ? true : false);
       }) 
     });
   }

}
