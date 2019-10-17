import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, registro } from '../services/storage.service';
import { IonList, ToastController, AlertController, Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
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

  public hst = new Array <Extrato>();
  private historicoSubscription: Subscription;

  @ViewChild('mylist', {static: false})mylist: IonList;

  constructor(private nav:NavController,
    private storageService:StorageService, 
    private toastController:ToastController, 
    private storage:Storage, 
    private alertController:AlertController,
    private historicoService: HistoricoService) { }

  //ionViewWillEnter(){
    ngOnInit(){
    this.listarHistorico();
    }
    /*this.loop = setInterval(() => {
      /this.msg();
    }, 1);
  }*/

  /*msg(){
    this.storage.get('historico').then(test => {
      if(test){
        if(this.historico.length !== 0){
          document.getElementById("test").style.display = "none";
        }else{
          document.getElementById("test").style.display = "block";
        }
      }
    })
  }*/

  listarHistorico(){
    this.historicoSubscription = this.historicoService.getAll().subscribe(data =>{
      this.hst = data
    })
  
     /* console.log("Estou dentro do historico.")
      console.log(this.hst.length)
      if(this.hst.length !== 0) {
        console.log("Existe historicos aqui")
        document.getElementById("test").style.display = "none";
      }else{
        console.log("NADA DE HISTORICO! PORRA!")
        document.getElementById("test").style.display = "block";
      }
      this.hst
    };*/
  

  /*deletarHistorico(historico:registro){
    this.storageService.deletarHistorico(historico.id).then(hist=>{
      this.showToast('Compra Deletada!');
      this.mylist.closeSlidingItems();
       setTimeout(()=> this.listarHistorico(), 100)  
    });*/
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
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
