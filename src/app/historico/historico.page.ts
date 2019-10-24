import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, registro } from '../services/storage.service';
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

  historico: registro[] = [];
  loop:any;

  public hst = Array<Extrato>();
  private historicoSubscription: Subscription;

  @ViewChild('mylist', {static: false})mylist: IonList;

  constructor(private nav:NavController,
    private toastController:ToastController, 
    private storage:Storage, 
    private alertController:AlertController,
    private historicoService: HistoricoService) { }

    ngOnInit(){
    this.listarHistorico();
    }
 
//função para listar os dados da tabela de historico
  listarHistorico(){
    this.historicoSubscription = this.historicoService.getAll().subscribe(data =>{
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
  histfechar(){
    clearInterval(this.loop);
    this.nav.pop()
  }

  async apagar() {
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
            this.storage.set("historico", []);
            setTimeout(()=> this.listarHistorico(), 100)
          }
        }
      ]
    });

    await alert.present();
  }


}
