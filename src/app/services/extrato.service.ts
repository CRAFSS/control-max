import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Extrato } from '../models/extrato';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ExtratoService {

  private extColections: AngularFirestoreCollection<Extrato>
  private userId: string

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  //função para listar os dados do usuário
  getAll() {
    this.getUser()
    return this.extColections.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    )
  }

  //função para adicionar movimentações do usuário
  addMovimentacao(extrato: Extrato) {
    this.getUser()
    return this.extColections.add(extrato);
  }

  //função que deleta movimentações do usuário
  deleteMovimentacao(id: string) {
    return this.extColections.doc(id).delete();
  }
  //Função para pegar o id do usuário e criar, caso não exista, uma nova coleção no banco de dados
  getUser() {
    this.userId = this.authService.getAuth().currentUser.uid
    this.extColections = this.db.collection<Extrato>("Extrato" + this.userId)
  }
}
