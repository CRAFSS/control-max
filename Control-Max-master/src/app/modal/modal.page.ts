import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService, registro } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Extrato } from '../models/extrato';
import { ExtratoService } from '../services/extrato.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit{

  registros: registro[] = [];
  registrosTest: registro[] = [];
  teste: Extrato = {}
  parar:any;
  total:number = 0;
  debito:boolean = false
  cretdito:boolean = false
  public teste1 = new Array<Extrato>();
  private extratoSubscripiton: Subscription;
  

  @ViewChild('mylist', {static: false})mylist: IonList;
  
  constructor(private modalController: ModalController,
    private router:Router, 
    private storageService: StorageService, 
    private toastController: ToastController, 
    private storage: Storage,
    private extratoService: ExtratoService) {

    }
    
    //ionViewWillEnter()
    ngOnInit(){
      this.listarRegistros(); 
      /*this.parar = setInterval(() => {
        /*this.msg();
        this.extratoSubscripiton = this.extratoService.getAll().subscribe(data =>{
          this.teste1 = data;
        })
      }, 1);*/
    
    }
     pegaTudo(){
      this.extratoSubscripiton =  this.extratoService.getAll().subscribe(data =>{
        this.teste1 = data;
        for(let i = 0; i < this.teste1.length; i++){
          console.log("vamos iniciar essa bagaça!!")
          if(this.teste1[i].tipo == "g"){
            console.log("Cheguei aqui no G")
            this.total += this.teste1[i].valor;
          }else{
            console.log("Cheguei aqui no D")
            this.total -= this.teste1[i].valor;
          }
        }
        this.teste1.forEach(element => {
          
      })
    })
    }
  /*msg(){
    this.storage.get('meus-registros').then(test => {
      if(test){
        if(this.registros.length !== 0){
          document.getElementById("test").style.display = "none";
        }else{
          document.getElementById("test").style.display = "block";
        }
      }
    })
  }*/

  fechar() {
    clearInterval(this.parar)
    this.modalController.dismiss();
  }

  async listarRegistros(){
    this.pegaTudo()
    console.log("Estou dentro do listar Registros.")
    console.log(this.teste1.length)
    /*this.teste1.forEach(element => {
      console.log("vamos iniciar essa bagaça!!")
      if(element.tipo == "g"){
        console.log("Cheguei aqui no G")
        this.total += element.valor;
      }else{
        console.log("Cheguei aqui no D")
        this.total -= element.valor;
      }
    });
    /*this.storageService.listaRegistros().then(registro =>{
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
      }});*/
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
