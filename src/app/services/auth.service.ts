import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa:AngularFireAuth) {}

  register(user:User){
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.senha);
  }
}