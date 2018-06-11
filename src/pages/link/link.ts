import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the LinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link',
  templateUrl: 'link.html',
})
export class LinkPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public iap: InAppBrowser
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkPage');
  }

  openLink(){
    this.iap.create("https://www.youtube.com/","_blank");

    
  }

  openLink2(){
    this.iap.create("https://www.google.com/","_blank");

    
  }

}
