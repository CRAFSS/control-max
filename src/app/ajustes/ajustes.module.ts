import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AjustesPage } from './ajustes.page';
import { HomePage } from '../home/home.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    HomePage
  ],
  declarations: [AjustesPage]
})
export class AjustesPageModule {}
