import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EjemplosPage } from './ejemplos';

@NgModule({
  declarations: [
    EjemplosPage,
  ],
  imports: [
    IonicPageModule.forChild(EjemplosPage),
  ],
})
export class EjemplosPageModule {}
