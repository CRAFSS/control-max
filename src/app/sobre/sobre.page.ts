import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExtratoService } from '../services/extrato.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  constructor(private nav:NavController,
              private t: ExtratoService) { }

  ngOnInit() {
    
  }
// função de botão de voltar página
  fechar() {
    this.nav.pop()
  }
  mesAtual = (new Date().getMonth()).toString()
  trocaAi(event){
    console.log(event.target.value)
    console.log(this.mesAtual == event.target.value)
    console.log(this.t.determinaMes(this.mesAtual))
    console.log(this.t.determinaMes(event.target.value))
  }
}
