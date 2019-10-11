import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Extrato } from '../models/extrato';
import { map } from "rxjs/operators";
import { Observable, Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HistoricoService {
  
  private hstCollections: AngularFirestoreCollection<Extrato>
  
  constructor(private db: AngularFirestore){
    this.hstCollections = this.db.collection<Extrato>("Historico")
    
  }

  getAll(){
    return this.hstCollections.snapshotChanges().pipe(
      map(action => {
        return action.map(a =>{
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;
          return{id, ...data}
        })
      })
    )
  }
}
