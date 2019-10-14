import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ModalPage } from './modal/modal.page';
import { timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  Clock = Date.now();
  inputValue :string;
  showSplash = true;

  constructor(private platform: Platform,private splashScreen: SplashScreen,private statusBar: StatusBar,private storage: Storage,private router:Router, private alertController:AlertController, private modal:ModalPage) {
    this.initializeApp();


  this.platform.ready().then(()=>{
    this.storage.get('introShown').then((result) => {
        if(result){
          this.router.navigateByUrl('home');
        }else {
          this.storage.set("meus-registros", []);
          this.storage.set("historico", []);
          this.router.navigateByUrl('intro')
          this.storage.set('introShown', true);
        }
      });
    });
  }
  

  
  ngOnInit(){
    setInterval(() => {
      this.Clock = Date.now();
      //this.trocademestest();
    }, 1000);

    this.storage.set('mes', true)
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(()=> this.showSplash = false);
    });


  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Novo Mês!',
      message: 'Um novo mês começou! seu gerenciador de compras foi zerado. Você pode consultar sua compras antigas no historico',
      buttons: ['OK']
    });

    await alert.present();
  }

  trocademestest(){
    this.inputValue = (<HTMLInputElement>document.getElementById("mes")).value;
    //console.log(this.inputValue);
    if(this.inputValue == "01"){
      this.storage.get('mes').then((mes) => {
        if(mes){
          this.presentAlert();
          this.storage.set("meus-registros", []);
          this.storage.set("mes", false);
        }
      });
    }else if(this.inputValue == "02"){
      this.storage.set("mes", true);
    }
  }
}
