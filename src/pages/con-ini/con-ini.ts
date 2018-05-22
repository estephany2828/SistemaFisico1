import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {SistemaService} from'../../service/sistema.service';


/**
 * Generated class for the ConIniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-con-ini',
  templateUrl: 'con-ini.html',
})
export class ConIniPage {

  ecuacionInicial: string[] = [];
  ecuacionLaplace: string[] = [];
  ecuacionFac: string[] = [];
  entradaM: string;
  entradaK: string;
  entradaB: string;
  resultado: string='';
  resultado1: string='';
  resultado2: string='';
  resultado3: string='';
  resultado4: string='';
  espacio: string='';
  variable:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.variable==0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConIniPage');
  }
  mostrar(){
    
    //ecuacion en terminos del desplazamiento
    this.ecuacionInicial= ['+','','x"(t)','+','',"x'(t)",'+','','x(t)','=','Fa'];
    this.ecuacionInicial[1]=this.entradaM;
    this.ecuacionInicial[4]=this.entradaK;
    this.ecuacionInicial[7]=this.entradaB;
    this.resultado=this.concatenar(this.ecuacionInicial,0);
    
    //sobre escribo en la ecuacion inicial los valore de m,k,b
    this.ecuacionLaplace= ['+','','(s^2)','X(s)','+','','s','X(s)','+','','X(s)','=','F(s)'];
    this.ecuacionLaplace[1]=this.entradaM;
    this.ecuacionLaplace[5]=this.entradaK;
    this.ecuacionLaplace[9]=this.entradaB;  
    //this.resultado1=this.concatenar(this.ecuacionLaplace,0);
    //el cero indica que queremos concatenar toda la cadena
    //el uno que queremos concatenar solo coeficientes
    this.resultado1=this.concatenar(this.ecuacionLaplace,0); 
  
    //segundo paso:Factorización
    this.ecuacionFac[0]='X(s)';
    this.ecuacionFac[1]='[';
    this.ecuacionFac[2]=this.concatenar(this.ecuacionLaplace,1); // este además es el denomnador
    this.ecuacionFac[3]=']';
    this.ecuacionFac[4]='=';
    this.ecuacionFac[5]='F(s)'
    this.resultado2=this.concatenar(this.ecuacionFac,0);
  
    //Despeje de la ecuación
    //denominador
    this.resultado3='1/'.concat(this.ecuacionFac[2]);
    this.variable=1;
    }
  
  
    
    mostrar2(){
  
    }
    concatenar(vector: string[],num:number):string{
        let cadena='';
        if(num==0){
          for(var i=0; i<vector.length; i++){ 
             cadena+=vector[i];
          }        
        }else if(num==1){
          for(var k=0; k<vector.length-2; k++){ 
            if(vector[k].localeCompare('X(s)')!=0){
              cadena+=vector[k];
            }else{cadena=cadena;}
            
          }
  
        }
  
        return cadena; 
      }

}
