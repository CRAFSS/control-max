import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  salario:string;
  //moeda:number;

  constructor(    
    private storage: Storage,
    private rootPage:Router,) { }

  ngOnInit() {
  }
  

  setSalario(){
    this.salario = (<HTMLInputElement>document.getElementById("salario")).value;
    let moeda = parseFloat(this.salario);
    if(isNaN(moeda)){
      console.log(moeda)
      this.storage.set('salario', 0)
      this.rootPage.navigateByUrl("/home")
    }else{
      console.log(moeda)
      this.storage.set('salario', moeda)
      this.rootPage.navigateByUrl("/home")
    }
  }

}
