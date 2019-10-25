import { Injectable } from '@angular/core';
import { Extrato } from '../models/extrato';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private hstCollections: AngularFirestoreCollection<Extrato>
  private userId: string

  constructor(private db: AngularFirestore, private authService: AuthService) {


  }
  // função para pegar todos os dados da coleção de historico.
  getAll() {
    this.getUser()
    return this.hstCollections.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    )
  }
  // função para adicionar dados a coleção historico.
  addHistorico(historico: Extrato) {
    this.getUser()
    return this.hstCollections.add(historico);
  }
  //Função para pegar o id do usuário
  getUser() {
    this.userId = this.authService.getAuth().currentUser.uid
    this.hstCollections = this.db.collection<Extrato>("Historico" + this.userId)
  }

  deleteHistory(id: string) {
    return this.hstCollections.doc(id).delete()
  }

}