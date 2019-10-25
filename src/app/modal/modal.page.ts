import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController, IonList } from '@ionic/angular';
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
export class ModalPage implements OnInit {

  parar: any;
  total: number = 0;
  public extrato = new Array<Extrato>();
  private extratoSubscripiton: Subscription;


  @ViewChild('mylist', { static: false }) mylist: IonList;

  constructor(private modalController: ModalController,
    private router: Router,
    private toastController: ToastController,
    private extratoService: ExtratoService) {

  }

  ngOnInit() {
    this.listarRegistros();
  }

  //função para listar as movimentações
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
    })
  }

  //função para fechar o modal
  fechar() {
    clearInterval(this.parar)
    this.modalController.dismiss();
  }

  async listarRegistros() {
    this.pegaTudo()
  }

  async deletarMovimentacao(id) {
    try {
      await this.extratoService.deleteMovimentacao(id);
      this.pegaTudo()
      this.showToast("Item deletado com sucesso!!")
    } catch (erro) {
      this.showToast(erro)
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

  //função para ir para a página de historico
  chahistorico() {
    clearInterval(this.parar)
    this.modalController.dismiss();
    this.router.navigateByUrl('historico')
  }

}
