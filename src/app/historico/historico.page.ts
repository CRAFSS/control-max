import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController, Platform, NavController } from '@ionic/angular';
import { Extrato } from '../models/extrato';
import { Subscription } from 'rxjs';
import { HistoricoService } from '../services/historico.service';
import  chartJs  from 'chart.js';
import { ExtratoService } from '../services/extrato.service';

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
    private historicoService: HistoricoService,
    private teste: ExtratoService) { }

  ngOnInit() {
    /*this.listarHistorico();
    setTimeout(() => {
      this.lineBarsCanvas = this.getChart()
    }, 150)*/
    console.log(screen.height)
    console.log(screen.width)

  }
  ionViewDidEnter(){
    this.listarHistorico();
    setTimeout(() => {
      this.lineBarsCanvas = this.getChart()
    }, 150)
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
  
  private positivo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  private negativo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  private loup = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  getChart() {

    for(let i = 0; i < this.loup.length; i++){
      this.loup[i] = Number(this.positivo[i].toFixed(2)) - Number(this.negativo[i].toFixed(2))
      this.loup[i] = Number(this.loup[i].toFixed(2))
    }
    console.log(this.positivo)
    console.log(this.negativo)

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
        data: this.positivo,
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
        data: this.negativo,
        scanGaps: false
      },
      {
        label: "Saldo",
        fill: false,
        lineTension: 0.,
        backgroundColor: "rgba(0, 255, 0, 0.8)",
        borderColor: "rgba(255, 0, 0, 0.8)",
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.loup,
        scanGaps: false
      }]
    }

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
                right: 40,
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

    for(let i = 0; i < 12; i++){
      console.log(i)
      this.historicoSubscription = this.teste.getAllMouth(i).subscribe(data => {

        this.hst = data

        if (this.hst.length != 0){
          console.log(this.teste.determinaMes(i))
          for(let j = 0; j < this.hst.length; j++){
            console.log(`O valor desse mês é: ${this.hst[j].valor}`)
            if (this.hst[j].credito){
              this.positivo[i] += this.hst[j].valor
            }else {
              this.negativo[i] += this.hst[j].valor
            }
          }
        }
      })
    }
    console.log(this.positivo)
    console.log(this.negativo)
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
