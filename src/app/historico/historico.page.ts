import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController, Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Extrato } from '../models/extrato';
import { Subscription } from 'rxjs';
import { HistoricoService } from '../services/historico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {

  loop: any;
  public hst = Array<Extrato>();
  private historicoSubscription: Subscription;

  @ViewChild('mylist', { static: false }) mylist: IonList;

  constructor(private nav: NavController,
    private toastController: ToastController,
    private alertController: AlertController,
    private historicoService: HistoricoService) { }

  ngOnInit() {
    this.listarHistorico();
  }

  //função para listar os dados da tabela de historico
  listarHistorico() {
    this.historicoSubscription = this.historicoService.getAll().subscribe(data => {
      this.hst = data
    })
  }
  //função para aparecer janela de confirmação
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  //função para fechar a tela de historico
  histfechar() {
    clearInterval(this.loop);
    this.nav.pop()
  }

  async apagar(hst: Array<Extrato>) {
    const alert = await this.alertController.create({
      header: 'Você realmente deseja apagar o histórico?',
      message: 'Isso apagará todo o histórico, sem posibilidade de recuperação',
      buttons: [
        {
          text: 'Não',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sim',
          handler: () => {
           console.log(hst.length)
            for (let i = 0; i < hst.length; i++) {
              console.log(hst[i].id)
              this.deletarHistory(hst[i].id)
            }
            this.showToast("Historico deletado com sucesso!!")
            this.listarHistorico()
           
          }
        }
      ]
    });

    await alert.present();
  }

  async deletarMovimentacao(id) {
    try {
      await this.historicoService.deleteHistory(id);
      //this.pegaTudo()
      this.showToast("Item deletado com sucesso!!")
    } catch (erro) {
      this.showToast(erro)
    }
    this.listarHistorico()
  }
  async deletarHistory(id: string) {
    try {
      await this.historicoService.deleteHistory(id);
      //this.pegaTudo()
    } catch (erro) {
      this.showToast(erro)
    }
    this.listarHistorico()
  }

}
