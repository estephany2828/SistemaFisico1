import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConIniPage} from '../con-ini/con-ini';
import {SinIniPage} from '../sin-ini/sin-ini';
import {EjemplosPage} from '../ejemplos/ejemplos';
import { LinkPage} from '../link/link';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
    

  }
 
  go(){
    this.navCtrl.push(LinkPage);
  }
  goEje():void{
    this.navCtrl.push(EjemplosPage);
   }
 goToConInicialPage():void{
  this.navCtrl.push(ConIniPage);
 }
 goToConInicialPage2():void{
  this.navCtrl.push(EjemplosPage);
 }
 goToSinInicialPage():void{
  this.navCtrl.push(SinIniPage);
 }


}
