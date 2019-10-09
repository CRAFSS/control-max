import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Extrato } from '../models/extrato';
import { map } from "rxjs/operators";
import { Observable, Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExtratoService {
  
  private extColections = this.db.collection<Extrato>("Extrato")
  
  constructor(private db: AngularFirestore){
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
  
}
