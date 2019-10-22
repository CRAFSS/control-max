import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


 private loading;
 userlog: User = {};

  constructor(private router:Router, private authserv:AuthService, private loadingController:LoadingController, private toastController:ToastController) { }

  ngOnInit() {
  }

  async login(){
    await this.presentLoading();
    
    try{
      await this.authserv.login(this.userlog)
    } catch(error){
      console.log(error);
      let mens:string;
        switch(error.code){
          case 'auth/argument-error':
            mens = "Senha invalida";
            break;

          case 'auth/invalid-email':
            mens = "E-mail invalido.";
            break;

          case 'auth/wrong-password':
            mens = "senha incorreta";
            break;

          case 'auth/user-not-found':
            mens = "Usuária não encontrado";
            break;                                    

          case 'auth/network-request-failed':
            mens = "Falha na conexão. Certifique-se que esteja conectado a internet.";
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
      duration: 3000
    });
    toast.present();
  }

  cad(){
    this.router.navigate(['cadastro'])
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({message: 'Carregando'});
    return this.loading.present();
  }

}
