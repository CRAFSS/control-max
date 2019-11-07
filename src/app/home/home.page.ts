import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { animacaoEntrada } from '../testeAnimacao/entrar';
import { anicacaoSaida } from '../testeAnimacao/sair';
import { NovogastoPage } from '../novogasto/novogasto.page';
import { ExtratoService } from '../services/extrato.service';
import { Extrato } from '../models/extrato';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private total: number = 0;
  public totalString: String
  public extrato = new Array<Extrato>();
  private extratoSubscripiton: Subscription;
  private valueDate: String;

  constructor(public modalController: ModalController,
    private extratoService: ExtratoService,
    public appComp: AppComponent) {
    console.log(this.extrato)
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

  trocademestest() {
    this.valueDate = this.appComp.inputValue
    //console.log(this.extrato[0].mes);//new Date().getMonth()
    console.log("Vamos escrever")
    let data = this.extrato.length != 0 ? true : false
    console.log("Vamos escrever" + data)
    if (data) {
      console.log("Essa é a data do banco: "+this.extrato[0].mes)
      console.log("Essa é a data de hoje: "+new Date().getMonth())
      console.log(this.extrato[0].mes != new Date().getMonth())
      if (this.extrato[0].mes != new Date().getMonth()){
        console.log("Cheguei aqui")
        try {
          for (let i = 0; i < this.extrato.length; i++) {
            //alert("Cheguei aqui!!!" + i)
            this.deletarMouth(this.extrato[i].id)
          }
        } catch (erro) {
          this.appComp.presentAlert(erro)
        }
        this.appComp.presentAlert('Um novo mês começou! seu gerenciador de compras foi zerado. Você pode consultar sua compras antigas no historico')
      }
    }
  }

  async deletarMouth(id: string) {
    try {
      await this.extratoService.deleteMovimentacao(id)
    } catch (erro) {
      this.appComp.presentAlert(erro)
    }
  }

  //função para mostrar o total na home
  pegaTudo() {
    this.extratoSubscripiton = this.extratoService.getAll().subscribe(data => {
      this.extrato = data;
      this.total = 0;
      for (let i = 0; i < this.extrato.length; i++) {
        if (this.extrato[i].tipo == "g") {
          this.total += this.extrato[i].valor;
        } else {
          this.total -= this.extrato[i].valor;
        }
      }
      console.log(this.extrato)
      let conv = this.total
      this.totalString = (this.formatter.format(conv))
      //console.log(this.total)
      if (this.total >= 0) {
        document.getElementById("saldo").style.color = "blue"
      } else {
        document.getElementById("saldo").style.color = "red"
      }
      //this.trocademestest()
    })
  }


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

  //Função para fechar o modal
  fechar() {
    this.modalController.dismiss();
  }
}
