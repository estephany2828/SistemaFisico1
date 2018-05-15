import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConIniPage} from '../con-ini/con-ini';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
    this.navCtrl.push(ConIniPage);

  }
 
}
