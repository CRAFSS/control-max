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
  private loading;

  constructor(private toastController:ToastController,private authserv:AuthService ,private loadingController:LoadingController, private toastctrl:ToastController) { }

  ngOnInit() {
  }


  async registor(){
    await this.presentLoading();
    
    try{
      await this.authserv.register(this.userregis)
    } catch(error){
      console.log(error);
      let mens:string;
        switch(error.code){
          case 'auth/email-already-in-use':
            mens = "E-mail já existe.";
            break;

          case 'auth/invalid-email':
            mens = "E-mail invalido.";
            break;

          case 'auth/argument-error':
            mens = "O cadastro teve conter um E-mail e um senha";
            break;                                    
        }
        this.presentToast(mens);

    } finally{
      this.loading.dismiss();
    }

  }

  async presentToast(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({message: 'Carregando'});
    return this.loading.present();
  }

}
