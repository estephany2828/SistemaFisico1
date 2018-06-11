import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';



/**
 * Generated class for the EjemplosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ejemplos',
  templateUrl: 'ejemplos.html',
})
export class EjemplosPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private iap: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EjemplosPage');
  }

  openLink(){
    this.iap.create("https://www.ion-book.com/","_blank");
    
  }
}






