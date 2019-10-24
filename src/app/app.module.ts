import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalPageModule } from './modal/modal.module';
import { NovogastoPageModule } from './novogasto/novogasto.module';
import { IonicStorageModule } from '@ionic/storage';
import { IntroPage } from './intro/intro.page';
import { AjustesPage } from './ajustes/ajustes.page';
import { ModalPage } from './modal/modal.page';
import { HistoricoPage } from './historico/historico.page';
import { HomePage } from './home/home.page';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [

  ],
 imports: [
    BrowserModule, 
    IonicModule.forRoot({
      backButtonText: 'Voltar'
    }), 
    AppRoutingModule,
    ModalPageModule,
    NovogastoPageModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(
      {
     apiKey: "AIzaSyB4fRb3O1F3QgzS62OqgpkBrrCZIAJtYg8",
    authDomain: "controlmax-b24a2.firebaseapp.com",
    databaseURL: "https://controlmax-b24a2.firebaseio.com",
    projectId: "controlmax-b24a2",
    storageBucket: "controlmax-b24a2.appspot.com",
    messagingSenderId: "413682781030",
    appId: "1:413682781030:web:e4f4bc1c1998143cb0d6a7",
    measurementId: "G-YV372D3R9C"
    }),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  providers: [
    HistoricoPage,
    ModalPage,
    AjustesPage,
    IntroPage,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
