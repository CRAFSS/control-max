import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Extrato } from '../models/extrato';
import { map } from "rxjs/operators";
import { Observable, Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExtratoService {
  
  private extColections: AngularFirestoreCollection<Extrato>
  
  constructor(private db: AngularFirestore){
    this.extColections = this.db.collection<Extrato>("Extrato")
    
  }

  getAll(){
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
  
  getYourMove(idUser: string){
    return this.extColections.doc(idUser).valueChanges();
  }
  addMovimentacao(extrato: Extrato){
    return this.extColections.add(extrato);
  }

  deleteMovimentacao(id: string){
    return this.extColections.doc(id).delete();
  }
}
