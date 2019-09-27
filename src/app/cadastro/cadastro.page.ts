import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {


  userregis: User = {};
  private loading:any;

  constructor(private authserv:AuthService ,private loadingController:LoadingController, private toastctrl:ToastController) { }

  ngOnInit() {
  }


  async registor(){
    await this.presentLoading();
    
    try{
      await this.authserv.register(this.userregis)
    } catch(error){
      console.log(error);
    } finally{
      this.loading.dismiss();
    }

  }

  async presentLoading() {
    const loading = await this.loadingController.create({message: 'Carregando'});
    return loading.present();
  }

}
