import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Extrato } from '../models/extrato';
import { map } from "rxjs/operators";
import { Observable, Subscribable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ExtratoService {
  
  private extColections: AngularFirestoreCollection<Extrato>
  private userId: string

  constructor(private db: AngularFirestore, private authService: AuthService){
    //this.pegaUser()
    //this.extColections = this.db.collection<Extrato>("Extrato"+this.userId)
    
  }
  async pegaUser(){
    await this.authService.getAuth().currentUser.uid
  }
  getAll(){
    this.userId = this.authService.getAuth().currentUser.uid
    this.extColections = this.db.collection<Extrato>("Extrato"+this.userId)
    return this.extColections.snapshotChanges().pipe(
      map(action => {
        return action.map(a =>{
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;
          return{id, ...data}
        })
      })
    )
  }
  /*NÃO USAR ESTA MERDA MAIS
  getYourMove(idUser: string){
    this.userId = this.authService.getAuth().currentUser.uid
    this.extColections = this.db.collection<Extrato>("Extrato"+this.userId)
    return this.extColections.doc<Extrato>(idUser).valueChanges();
  }*/
  addMovimentacao(extrato: Extrato){
    this.userId = this.authService.getAuth().currentUser.uid
    this.extColections = this.db.collection<Extrato>("Extrato"+this.userId)
    return this.extColections.add(extrato);
  }

  deleteMovimentacao(id: string){
    return this.extColections.doc(id).delete();
  }
}
