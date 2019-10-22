import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public modalController: ModalController, private nav:NavController) { }

  ngOnInit() {

  }

  fechar() {
    this.nav.pop()
  }

}
