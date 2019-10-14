import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { animacaoEntrada } from '../testeAnimacao/entrar';
import { anicacaoSaida } from '../testeAnimacao/sair';
import { NovogastoPage } from '../novogasto/novogasto.page';
import { registro } from '../services/storage.service';
import { Storage } from '@ionic/storage';
import { HistoricoPage } from '../historico/historico.page';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  registros: registro[] = [];
  
  moeda:string;
  storageService: any;
  testii:string;
  balanco:number;
  a:number; 
  b:number;
  
  constructor(public modalController: ModalController, private storage:Storage, private modal:ModalPage, private hist:HistoricoPage) { }

  formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  ngOnInit() {
    //habilitar swipe em todas a direções
    var hammertime = new Hammer(document.body);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    
    setInterval(() => {
      this.pegarSalario();
      this.total();
      this.modal.listarRegistros();
      this.hist.listarHistorico();
    }, 1000);
    
    // this.plt.ready().then(()=>{
      //this.pegarSalario();
   //}) 
   this.balancos();
  }

  async balancos(){
    this.storage.get("salario").then((a1) => {
       this.a= a1
       console.log("a "+this.a);
      })
      this.storage.get("total").then((b1) => {
        this.b= b1
        console.log("b "+this.b)
      })
      this.balanco = this.a - this.b;   
      await console.log("balanco "+this.balanco)
  }
  

  total(){
    this.storage.get("total").then((soma) =>{
      this.testii = this.formatter.format(soma);
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      enterAnimation: animacaoEntrada,
      leaveAnimation: anicacaoSaida
    });
    return await modal.present();
  }

  async novog() {
    const modal = await this.modalController.create({
      component: NovogastoPage
    });
    return await modal.present();
  }

  fechar() {
    this.modalController.dismiss();
  }

  pegarSalario(){
    this.storage.get('salario').then((val) => {
      this.moeda = this.formatter.format(val);
    });
    this.storage.get("total").then((soma) =>{
      this.testii = this.formatter.format(soma);
      //console.log(this.testii)
    })
  }


}
