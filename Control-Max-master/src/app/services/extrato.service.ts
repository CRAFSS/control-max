import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Extrato } from '../models/extrato';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExtratoService {
  
  private extratoCollection: AngularFirestoreCollection<Extrato>
  private extrato: Observable<Extrato>
  
  constructor(private afs: AngularFirestore) {
     this.extratoCollection = this.afs.collection<Extrato>('Extrato') 
     this.extrato = this.extratoCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data()
          const id = a.payload.doc.id

          return {id, data}
        })
      })
    )
  }


  addMovimentacao(extrato: Extrato){
    return this.extratoCollection.add(extrato)
  }

  getYourMove(){
    //return this.extratoCollection.doc<Extrato>().valueChanges()
    
  }

  deleteMovimentacao(id: string){

  }
}
