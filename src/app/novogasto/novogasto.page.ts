import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtratoService } from '../services/extrato.service';
import { Extrato } from '../models/extrato';
import { HistoricoService } from '../services/historico.service';

@Component({
  selector: 'app-novogasto',
  templateUrl: './novogasto.page.html',
  styleUrls: ['./novogasto.page.scss'],
})
export class NovogastoPage implements OnInit {

  novoRegistro1: Extrato = <Extrato>{};
  ngasto: FormGroup;

  constructor(public modalController: ModalController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private extratoService: ExtratoService,
    private historicoService: HistoricoService) { }

  ngOnInit() {
    //habilitar o hammerjs em todas as direções
    var hammertime = new Hammer(document.body);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    
    //Validação do formulário
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
    let teste = new Date().getMonth()
    console.log(teste)
  }

  //função para fechar modal
  fechar() {
    this.modalController.dismiss();
  }

  // Código para adicionar novos gastos no Firebase
  addRegistro() {
    this.novoRegistro1.modificado = Date.now();
    //this.novoRegistro1.mes = new Date().getMonth()
    this.novoRegistro1.mes = 4
    console.log(this.novoRegistro1.mes)
    try {
      if (this.novoRegistro1.tipo == "g") {
        console.log("Credito")
        this.novoRegistro1.credito = true;
        this.novoRegistro1.debito = false;
      } else if (this.novoRegistro1.tipo == "d") {
        console.log("debito")
        this.novoRegistro1.credito = false;
        this.novoRegistro1.debito = true;
      }
      console.table(this.novoRegistro1)
      this.extratoService.addMovimentacao(this.novoRegistro1)
      this.historicoService.addHistorico(this.novoRegistro1)
      this.ngasto.reset();
      this.showToast('Compra Adicionada!')
    } catch (error) {
      console.error(error)
    } finally {
      console.log("Eu gosto de mim!!!!")
    }

  }

  //função para aparecer janela de confirmação
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  inputtext: string;
  key: string = 'username';
}
