import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConIniPage} from '../con-ini/con-ini';
import {SinIniPage} from '../sin-ini/sin-ini';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
    

  }
 
 goToConInicialPage():void{
  this.navCtrl.push(ConIniPage);
 }

 goToSinInicialPage():void{
  this.navCtrl.push(SinIniPage);
 }
}
