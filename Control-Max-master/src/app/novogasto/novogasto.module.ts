import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NovogastoPage } from './novogasto.page';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

const routes: Routes = [
  {
    path: '',
    component: NovogastoPage
  }
];

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL } // override default settings
  }
}

// In your module providers, add this :


@NgModule({
  providers: [
    { 
  provide: HAMMER_GESTURE_CONFIG, 
  useClass: MyHammerConfig 
    }
  ],

  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovogastoPage]
})
export class NovogastoPageModule {}
