import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Extrato } from '../models/extrato';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {
  private extratoCollection: AngularFirestoreCollection<Extrato>

  constructor(private afs: AngularFirestore) { 
    this.extratoCollection = this.afs.collection<Extrato>('Extrato') 
  }


  addMovimentacao(extrato: Extrato){
    return this.extratoCollection.add(extrato)
  }

  getAll(){
    return this.extratoCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data()
          const id = a.payload.doc.id

          return {id, ...data}
        })
      })
    )
  }

  deleteMovimentacao(id: string){

  }
}