import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { animacaoEntrada } from '../testeAnimacao/entrar';
import { anicacaoSaida } from '../testeAnimacao/sair';
import { NovogastoPage } from '../novogasto/novogasto.page';
import { ExtratoService } from '../services/extrato.service';
import { Extrato } from '../models/extrato';
import { Subscription } from 'rxjs';

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

  constructor(public modalController: ModalController,
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
      let conv = this.total
      this.totalString = (this.formatter.format(conv))
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

  fechar() {
    this.modalController.dismiss();
  }
}
