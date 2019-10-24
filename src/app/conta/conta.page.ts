import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {

  constructor(private test:AuthService, private nav:NavController) { }

  ngOnInit() {
  }
//função para deslogar
  logout(){
    this.test.logout();
  }
//função para voltar á página anterior
  fechar() {
    this.nav.pop()
  }

}
