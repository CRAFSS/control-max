import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { animacaoEntrada } from '../testeAnimacao/entrar';
import { anicacaoSaida } from '../testeAnimacao/sair';
import { NovogastoPage } from '../novogasto/novogasto.page';
import { registro } from '../services/storage.service';
import { Storage } from '@ionic/storage';
import { HistoricoPage } from '../historico/historico.page';
import { ExtratoService } from '../services/extrato.service';
import { Extrato } from '../models/extrato';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  registros: registro[] = [];
  
  moeda:string;
  storageService: any;
  testii:string;
  balanco:number;
  a:number; 
  b:number;
  total: number = 0;
  public totalString: String
  public teste1 = new Array<Extrato>();
  public products: Extrato = {};
  private extratoSubscripiton: Subscription;
  
  constructor(public modalController: ModalController, 
    private storage:Storage, 
    private modal:ModalPage, 
    private hist:HistoricoPage,
    private extratoService: ExtratoService) { 
      this.pegaTudo()
     }
  
  //formatar número inteiro para moeda
  formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });


  ionViewWillEnter() {
    //habilitar swipe em todas a direções
    var hammertime = new Hammer(document.body);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  }

  /*async balancos(){
    this.storage.get("salario").then((a1) => {
       this.a= a1
       console.log("a "+typeof(this.a));
      })
      this.storage.get("total").then((b1) => {
        this.b= b1
        console.log("b "+typeof(this.b))
      });
      this.balanco = this.a + this.b;   
      console.log("balanco "+ this.balanco)
  }*/

  //função para mostrar o total na home
  pegaTudo() {
    this.extratoSubscripiton = this.extratoService.getAll().subscribe(data => {
      this.teste1 = data;
      this.total = 0;
      for (let i = 0; i < this.teste1.length; i++) {
        console.log("vamos iniciar essa bagaça!!")
        if (this.teste1[i].tipo == "g") {
          console.log("Cheguei aqui no G")
          this.total += this.teste1[i].valor;
        } else {
          console.log("Cheguei aqui no D")
          this.total -= this.teste1[i].valor;
        }
      }
      let conv = this.total
      this.totalString = (this.formatter.format(conv))
      console.log(this.totalString)
    })
  }

  /*total1(){
    this.storage.get("total").then((soma) =>{
      this.testii = this.formatter.format(soma);
    })
  }*/

  //função para chamar o modal de movimentações
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      enterAnimation: animacaoEntrada,
      leaveAnimation: anicacaoSaida
    });
    return await modal.present();
  }

  //função para chamar o modal de novos gastos
  async novog() {
    const modal = await this.modalController.create({
      component: NovogastoPage
    });
    return await modal.present();
  }

  fechar() {
    this.modalController.dismiss();
  }
  //função para somar todos os gastos
  /*pegarSalario(){
    let salario;
    this.storage.get('salario').then((val) => {
      this.moeda = val
      this.storage.get("total").then((soma) =>{
        this.testii = soma
        let temp = Number(this.moeda) + Number(this.testii); 
        this.testii = this.formatter.format(Number(this.testii))
        this.moeda = this.formatter.format(Number(temp))
      })
    });
  }*/
}
