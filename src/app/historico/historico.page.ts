import { Component } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
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
    console.log(screen.height)
    console.log(screen.width)

  }
  ionViewDidEnter(){
    this.listarHistorico();
    setTimeout(() => {
      this.lineBarsCanvas = this.getChart()
    }, 500)
  }
  
  private positivo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  private negativo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  private loup = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  getChart() {

    for(let i = 0; i < this.loup.length; i++){
      this.loup[i] = Number(this.positivo[i].toFixed(2)) - Number(this.negativo[i].toFixed(2))
      this.loup[i] = Number(this.loup[i].toFixed(2))
    }
    /*console.log(this.positivo)
    console.log(this.negativo)
    */
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

  //função para listar os dados da tabela de historico
  listarHistorico(year?) {
    for(let i = 0; i < 12; i++){
      console.log(i)
      this.historicoSubscription = this.teste.getAllMouth(i, year).subscribe(data => {
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

  public anos = [2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]

  trocaAno(e){
    this.positivo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.negativo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.loup = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    console.log(e.target.value)
    this.listarHistorico(e.target.value)
    setTimeout(() => {
      this.lineBarsCanvas = this.getChart()
    }, 500)
  }
}
