import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService, registro } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ExtratoService } from '../services/extrato.service';
import { Extrato } from '../models/extrato';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit{

  registros: registro[] = [];
  parar:any;
  total:number;
  debito:boolean = false
  cretdito:boolean = false

  @ViewChild('mylist', {static: false})mylist: IonList;
  
  constructor(private modalController: ModalController,
    private router:Router, 
    private storageService: StorageService, 
    private toastController: ToastController, 
    private storage: Storage,
    private extrato: Extrato,
    private extratoService: ExtratoService) {
  }
  
  //ionViewWillEnter()
  ngOnInit(){
    this.listarRegistros();
    this.parar = setInterval(() => {
      this.msg();
    }, 1);
  }

  msg(){
    this.storage.get('meus-registros').then(test => {
      if(test){
        if(this.registros.length !== 0){
          document.getElementById("test").style.display = "none";
        }else{
          document.getElementById("test").style.display = "block";
        }
      }
    })
  }

  fechar() {
    clearInterval(this.parar)
    this.modalController.dismiss();
  }

  listarRegistros(){
    try{
      this.extratoService.getMovimentacao(this.extrato[0].id)
    }
    catch (error){
      console.log(error);
      
    }
    finally{
      console.log("legal");
    }
    this.storageService.listaRegistros().then(registro =>{
      this.registros = registro;
      this.total = 0;
      for(let i = 0; i < this.registros.length; i++){
        console.log(this.registros[i].tipo)
        if((this.registros[i].tipo).toString()=="d"){
          this.registros[i].debito = true;
          this.registros[i].credito = false; 
        }else{
          this.registros[i].debito = false;
          this.registros[i].credito = true;
        }
      }
      if(this.registros){
        this.registros.forEach(element => {
          if(element.tipo == "g"){
            this.total += element.valor;
          }else{
            this.total -= element.valor;
          }
        });
        this.storage.set("total", this.total)
      }});
  }

  deletarRegistro(registro:registro){
    this.storageService.deletarRegistro(registro.id).then(registro=>{
      this.showToast('Compra Deletada!');
      this.mylist.closeSlidingItems();
      this.listarRegistros();
    })
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  chahistorico(){
    clearInterval(this.parar)
    this.modalController.dismiss();
    this.router.navigateByUrl('historico')
  }

}
