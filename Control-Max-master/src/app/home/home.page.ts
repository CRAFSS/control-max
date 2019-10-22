import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  
  // Variável que formata o total do usuário para ser exibido como valor monetário. (EX: R$ 1.000,00)
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



  //Função que resgata os dados do banco de dados faz os calculos dos valores e deixa exibe na home.
  pegaTudo() {
    this.extratoSubscripiton = this.extratoService.getAll().subscribe(data => {
      this.teste1 = data;
      this.total = 0;
      for (let i = 0; i < this.teste1.length; i++) {
        console.log("vamos iniciar essa bagaça!!")
        if (this.teste1[i].tipo == "g") {
          console.log("Cheguei aqui no G")
          this.total += this.teste1[i].valor;
          console.log(this.total)
        } else {
          console.log("Cheguei aqui no D")
          this.total -= this.teste1[i].valor;
          console.log(this.total)
        }
        let conv = this.total
        this.totalString = (this.formatter.format(conv))
        console.log("Esse é o totalString:"+this.totalString+", Esse é o total: "+this.total)
      }
    })
  }

  //Função que constroi modal da página que exibe todos as movimentações
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      enterAnimation: animacaoEntrada,
      leaveAnimation: anicacaoSaida
    });
    return await modal.present();
  }
  //Função que controi modal da página que acrescenta novas movimentações
  async novog() {
    const modal = await this.modalController.create({
      component: NovogastoPage
    });
    return await modal.present();
  }
  
  //Função para "destriur o modal aberto"
  fechar() {
    this.modalController.dismiss();
  }

  pegarSalario(){
    let salario;
    this.storage.get('salario').then((val) => {
      this.moeda = val
      //this.formatter.format(val);
      this.storage.get("total").then((soma) =>{
        this.testii = soma
        //this.formatter.format(soma);
        let temp = Number(this.moeda) + Number(this.testii); 
        this.testii = this.formatter.format(Number(this.testii))
        this.moeda = this.formatter.format(Number(temp))
      })
    });
    //this.testii = this.formatter.format(this.testii);
  }


}
