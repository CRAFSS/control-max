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
import { ReactiveFormsModule } from '@angular/forms';
import { HistoricoPage } from './historico/historico.page';
import { HomePage } from './home/home.page';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      backButtonText: 'Voltar',
      //mode: 'md',
    }), 
    AppRoutingModule,
    ModalPageModule,
    NovogastoPageModule,
    IonicStorageModule.forRoot()
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
