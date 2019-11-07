import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ModalPage } from './modal/modal.page';
import { timer, Subscription } from 'rxjs';
import { ExtratoService } from './services/extrato.service';
import { Extrato } from './models/extrato';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  Clock = Date.now();
  public inputValue: string;
  showSplash = true;
  public extrato = new Array<Extrato>();
  private extratoSubscripiton: Subscription;


  constructor(private platform: Platform, 
    private splashScreen: SplashScreen, 
    private statusBar: StatusBar, 
    private storage: Storage, 
    private router: Router, 
    private alertController: AlertController, 
    private modal: ModalPage,
    private extControl: ExtratoService) {
    this.initializeApp();
    
    this.platform.ready().then(() => {
      this.inputValue = (<HTMLInputElement>document.getElementById("mes")).value;
      this.storage.get('introShown').then((result) => {
        if (result) {
          this.router.navigateByUrl('home');
        } else {
          this.storage.set("meus-registros", []);
          this.storage.set("historico", []);
          this.router.navigateByUrl('intro')
          this.storage.set('introShown', true);
        }
      });
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.Clock = Date.now();
    }, 1000);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);
    });


  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Novo Mês!',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  trocademestest(extrato) {
    this.inputValue = (<HTMLInputElement>document.getElementById("mes")).value;
    console.log(this.inputValue);
    if (this.extrato[0].mes != new Date().getMonth()) {
      console.log(extrato.length)
      try{
        for (let i = 0; i < extrato.length; i++){
          alert("Cheguei aqui!!!"+i)
          //this.deletarMouth(this.extrato[i].id)
        }
        this.presentAlert('Um novo mês começou! seu gerenciador de compras foi zerado. Você pode consultar sua compras antigas no historico')
      } catch(erro){
        this.presentAlert(erro)
      }
    }
  }


}
