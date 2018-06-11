import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {SistemaService} from'../../service/sistema.service';
/**
 * Generated class for the SinIniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sin-ini',
  templateUrl: 'sin-ini.html',
})
export class SinIniPage {
  ecuacionInicial: string[] = [];
  ecuacionLaplace: string[] = [];
  auxiliar:string[]=[];
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
  signo:string[]=[];//variable que almacena los signos
  btnSigno:number[]=[1,1,1];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.variable==0;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConIniPage');
  }

  funSigno(signo:number):string{
   if(signo==1){
     return "+";
   }else{ return "-"; }
  }

  funRecorrerSigno(vector:number[]){
    for(var i=0; i<3;i++){
      this.signo[i]=this.funSigno(vector[i]);
    }
  }

  
  mostrar(){
    this.funRecorrerSigno(this.btnSigno);   
    this.entradaM=this.entradaM.substring(0,this.entradaM.length);
    this.entradaK=this.entradaK.substring(0,this.entradaK.length);
    this.entradaB=this.entradaB.substring(0,this.entradaB.length);

    //ecuacion en terminos del desplazamiento
    this.ecuacionInicial= [this.signo[0],this.entradaM,'x"',
                           this.signo[1],this.entradaK,"x'",
                           this.signo[2],this.entradaB,'x','=','Fa'];    
    this.resultado=this.concatenar(this.ecuacionInicial,0);

    this.auxiliar[0]= "L{"+this.signo[0]+this.entradaM+'x"'+
                          this.signo[1]+this.entradaK+"x'"+
                          this.signo[2]+this.entradaB+'x'+"}"+'='+'L{Fa}';
    
    this.auxiliar[1]= "L{"+this.signo[0]+this.entradaM+'x"'+"}"+"+"+
                      "L{"+this.signo[1]+this.entradaK+"x'"+"}"+"+"+
                      "L{"+this.signo[2]+this.entradaB+'x'+"}"+'='+'L{Fa}';

    this.auxiliar[2]= this.signo[0]+this.entradaM+"L{"+'x"'+"}"+
                      this.signo[1]+this.entradaK+"L{"+"x'"+"}"+
                      this.signo[2]+this.entradaB+"L{"+'x'+"}"+'='+'L{Fa}'; 
                      
                  
    
    //sobre escribo en la ecuacion inicial los valore de m,k,b
    this.ecuacionLaplace= [this.signo[0],this.entradaM,'(s^2)','X(s)',
                           this.signo[1],this.entradaK,'s','X(s)',
                           this.signo[2],this.entradaB,'X(s)','=','F(s)'];
   
    
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
    this.resultado3=  this.ecuacionFac[2];
    this.variable=1;
    }
  
  
    
    cambiar(estado:number){
      switch(estado){
        case 0: 
        if(this.btnSigno[0]==1){
          this.btnSigno[0]=0;
        }else if(this.btnSigno[0]==0){
          this.btnSigno[0]=1;
        } 
        break;
        case 1: 
        if(this.btnSigno[1]==1){
          this.btnSigno[1]=0;
        }else if(this.btnSigno[1]==0){
          this.btnSigno[1]=1;
        } 
        break;
        case 2: 
        if(this.btnSigno[2]==1){
          this.btnSigno[2]=0;
        }else if(this.btnSigno[2]==0){
          this.btnSigno[2]=1;
        } 
        break;

      }

         
      
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
