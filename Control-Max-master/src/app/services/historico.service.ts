import { Injectable } from '@angular/core';
import { Extrato } from '../models/extrato';
import { AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

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
    addHistorico(historico: Extrato){
      return this.hstCollections.add(historico);
  }
  
  //deleteHistorico(id: string){
    //return this.hstCollections.doc(id).delete();
  //}
}
