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
  getAllMouth(mesNumero) {
    let ano = new Date().getFullYear()
    //let mesNumero = 2
    
    this.userId = this.authService.getAuth().currentUser.uid
    let extColections = this.db.collection<Extrato>(this.userId).doc(`Extrato-${ano}`).collection<Extrato>(this.determinaMes(mesNumero))   
    //let extColections = this.db.collection<Extrato>(this.userId)   
       
    return extColections.snapshotChanges().pipe(
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
  getUser(mes?) {
    let ano = new Date().getFullYear()
    let mesNumero;
    if (mes){
      console.log(mes)
    }else {
      mesNumero = new Date().getMonth()
    }

    
    this.userId = this.authService.getAuth().currentUser.uid
    this.extColections = this.db.collection<Extrato>(this.userId).doc(`Extrato-${ano}`).collection<Extrato>(this.determinaMes(mesNumero))
  }

  public determinaMes(mesNumero){
    mesNumero = Number(mesNumero)
    let mes: string;
    switch (mesNumero) {
      case 0:
        mes = "Janeiro";
        break
      case 1:
        mes = "Fevereiro"
        break
      case 2:
        mes = "Março"
        break
      case 3:
        mes = "Abril"
        break
      case 4:
        mes = "Maio"
        break
      case 5:
        mes = "Junho"
        break
      case 6:
        mes = "Julho"
        break
      case 7:
        mes = "Agosto"
        break
      case 8:
        mes = "Setembro"
        break
      case 9:
        mes = "Outubro"
        break
      case 10:
        mes = "Novembro"
        break
      case 11:
        mes = "Dezembro"
        break
    }
    return mes;
  }
}
