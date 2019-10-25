import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  //função para fazer login
  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.senha);
  }

  //função para criar um login/usuário
  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.senha);
  }

  //função para manter uma conta logada
  getAuth() {
    return this.afa.auth;
  }

  //função para dar logout
  logout() {
    return this.afa.auth.signOut();
  }
}
