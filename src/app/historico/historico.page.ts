import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController, Platform, NavController } from '@ionic/angular';
import { Extrato } from '../models/extrato';
import { Subscription } from 'rxjs';
import { HistoricoService } from '../services/historico.service';
import  chartJs  from 'chart.js';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {
  lineBarsCanvas: any;
  private grafico: boolean = false;
  loop: any;
  public hst = Array<Extrato>();
  private historicoSubscription: Subscription;

  

  constructor(private nav: NavController,
    private toastController: ToastController,
    private alertController: AlertController,
    private historicoService: HistoricoService) { }

  ngOnInit() {
    this.listarHistorico();
    setTimeout(() => {
      this.lineBarsCanvas = this.getChart(this.hst)
    }, 150)
    console.log(screen.height)
    console.log(screen.width)

  }

  slideoptions={
    responsive: true,
    maintainAspectRatio: false
    /*spaceBetween: 10,
    centeredSlides: true,
    //slidesPerView: 1.6,
    //autoHeight: true,
    zoom:{
      maxRatio: 5
    }*/
  }
  private dados = [20, 45, 27, 18, 10, 38, 21, 45, 17, 55, 1, 52]
  private dados2 = [30, 25, 27, 8, 20, 18, 1, 35, 17, 15, 31, 22]

  getChart(hst) {
    let positivo = []
    let pstTotal = 0
    let negativo = []
    let ngtTotal = 0
    let loup = 0
    for (let i = 0; i < this.hst.length; i++){
      if (this.hst[i].credito){
        pstTotal += +this.hst[i].valor
      }else{
        ngtTotal += +this.hst[i].valor
      }
    } 
    let cor: string
    loup = pstTotal - ngtTotal
    if (loup >= 0){
      cor = "rgba(0, 178, 255, 0.8)"
    }else{
      cor = "rgba(255, 0, 0, 0.8)"
    }
    console.log(loup)
    let ctx = document.getElementById("line")
    
    let data = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      datasets: [{
        label: "Receitas",
        fill: false,
        lineTension: 0.,
        backgroundColor: "rgba(0, 178, 255, 0.8)",
        borderColor: "rgba(0, 0, 255, 0.8",
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.dados,//[pstTotal],
        scanGaps: false
      },
      {
        label: "Despesas",
        fill: false,
        lineTension: 0.,
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(231, 205, 35, 0.8",
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.dados2,//[ngtTotal],
        scanGaps: false
      },
      {
        label: "Saldo",
        fill: false,
        lineTension: 0.,
        backgroundColor: cor,
        borderColor: "rgba(255, 0, 0, 0.8",
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.dados,//[loup],
        scanGaps: false
      }]
    }
    /*[d1[0] - d2[0], d1[1] - d2[1], d1[2] - d2[2], d1[3] - d2[3], d1[4] - d2[4], d1[5] - d2[5], d1[6] - d2[6], d1[7] - d2[7], d1[8] - d2[8], d1[9] - d2[9],
        d1[10] - d2[10],
        d1[11] - d2[11]]*/
    return new chartJs(ctx, {
      height: "6000",
      data,
      type: "bar",
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        layout: {
            padding: {
                left: 0,
                right: 30,
                top: 30,
                bottom: 10
            }
        }
    }
    })
  }

  esconde(){
    console.log(this.grafico)
    let mostra = !this.grafico
    console.log(mostra)
    if (mostra){
      document.getElementById("numeros").style.display = "none"
      document.getElementById("grafico").style.display = "block"
    }else{
      document.getElementById("numeros").style.display = "block"
      document.getElementById("grafico").style.display = "none"
    }
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
