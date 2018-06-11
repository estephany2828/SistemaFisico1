import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConIniPage } from '../pages/con-ini/con-ini';
import { SinIniPage } from '../pages/sin-ini/sin-ini';
import { EjemplosPage} from '../pages/ejemplos/ejemplos';
import { LinkPage} from '../pages/link/link';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@NgModule({
  declarations: [
    LinkPage,
    EjemplosPage,
    ConIniPage,
    SinIniPage,    
    MyApp,
    HomePage    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LinkPage,
    EjemplosPage,
    ConIniPage,
    SinIniPage,    
    MyApp,
    HomePage    
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
