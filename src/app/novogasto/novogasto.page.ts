import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { registro } from '../services/storage.service';
import { StorageService } from '../services/storage.service';
import { ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePageModule } from '../home/home.module';
import { HomePage } from '../home/home.page';
import { ExtratoService } from '../services/extrato.service';


@Component({
  selector: 'app-novogasto',
  templateUrl: './novogasto.page.html',
  styleUrls: ['./novogasto.page.scss'],
})
export class NovogastoPage implements OnInit {

  novoRegistro: registro = <registro>{};
  ngasto: FormGroup;
  debito:boolean = false
  cretdito:boolean = false

  constructor(public modalController: ModalController,
    private storageService: StorageService, 
    private toastController: ToastController,
    private storage:Storage,
    private formBuilder: FormBuilder,
    private extratoService: ExtratoService) { }

  ngOnInit() {
    //habilitar o hammerjs em todas as direções
    var hammertime = new Hammer(document.body);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    this.ngasto = this.formBuilder.group({
      lugar: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ],
      ],
      tipo: [
        '',
        [
          Validators.required
        ],
      ],
      valor: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ],
      ]
    })
  }

  //função para fechar modal
  fechar() {
    this.modalController.dismiss();
  }

  addRegistro(){
    this.novoRegistro.id = Date.now();
    this.novoRegistro.modificado = Date.now();
    this.novoRegistro.debito = false;
    this.novoRegistro.credito = false;
    // Código para adicionar novos gastos no Firebase
    try {
      this.extratoService.addMovimentacao(this.novoRegistro)
    } catch (error) {
      console.error(error)
    }finally{
      console.log("Eu gosto de mim!!!!")
    }
    this.storageService.addRegistro(this.novoRegistro).then(registro => {
      this.novoRegistro = <registro>{};
      this.showToast('Compra Adicionada!')
    })
    this.storageService.addhistoric(this.novoRegistro).then(registro => {
      this.novoRegistro = <registro>{};
    })
    console.log(this.novoRegistro)
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  inputtext:string;
  key:string = 'username';

  saveData(){
    this.storage.set(this.key, this.inputtext);   
  }

  loadData(){
    this.storage.get(this.key).then((val)=>{
      console.log(val);
    })
  }


}
