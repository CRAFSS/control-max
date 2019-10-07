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

  logout(){
    this.test.logout();
  }

  fechar() {
    this.nav.pop()
  }

}
