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
  fuerza:string;
  resultado: string='';
  apliLaplace: string[]=[];//index0: transformada a toda la ecuacion
  resultado11: string='';
  resultado111: string='';
  resultado1111: string='';
  resultado2: string='';
  resultado3: string='';
  resultado44: string='';
  espacio: string='';
  variable:number;
  signo:string[]=[];//variable que almacena los signos
  btnSigno:number[]=[1,1,1,1,1,1];
  reunir:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.variable==0;

  }
 
  mostrar(){
    this.funRecorrerSigno(this.btnSigno);   
    this.entradaM=this.entradaM.substring(0,this.entradaM.length);
    this.entradaK=this.entradaK.substring(0,this.entradaK.length);
    this.entradaB=this.entradaB.substring(0,this.entradaB.length);
    this.fuerza=this.fuerza.substring(0,this.fuerza.length);    

    //ecuacion en terminos del desplazamiento
    this.ecuacionInicial= [this.signo[0],this.entradaM,'x"',
                           this.signo[1],this.entradaK,"x'",
                           this.signo[2],this.entradaB,'x',"=",this.signo[3],this.fuerza,"u(t)"];    
    this.resultado=this.concatenar(this.ecuacionInicial,0);      
    //this.resultado1=this.concatenar(this.ecuacionLaplace,0);
    //el cero indica que queremos concatenar toda la cadena
    //el uno que queremos concatenar solo coeficientes
    this.apliLaplace[0]="L{"+this.resultado+"}"; 
    //transforada a toda la ecuacion
    this.apliLaplace[1]="L{" + this.concatenarVectorIndex(this.ecuacionInicial,0,2)+"}"+ "+"+
                      "L{" + this.concatenarVectorIndex(this.ecuacionInicial,3,5)+"}"+"+"+
                      "L{" + this.concatenarVectorIndex(this.ecuacionInicial,6,8)+"}"+"="+
                      "L{" + this.concatenarVectorIndex(this.ecuacionInicial,10,this.ecuacionInicial.length-1)+"}";
    //sacamos el signo y el coeficiente
    this.apliLaplace[2]=  this.signo[0]+this.entradaM+"L{"+'x"'+"}"+ 
                        this.signo[1]+this.entradaK+"L{"+"x'"+"}"+
                        this.signo[2]+this.entradaB+"L{"+"x"+"}"+"="+
                        this.signo[3]+"L{" + this.concatenarVectorIndex(this.ecuacionInicial,11,this.ecuacionInicial.length-1)+"}";
                      
    
    this.apliLaplace[3]=  this.signo[0]+this.entradaM+"["+"s^2"+'x(s)'+"]"+ 
                          this.signo[1]+this.entradaK+"["+"s"+'x(s)'+"]"+ 
                          this.signo[2]+this.entradaB+"["+'x(s)'+"]"+"="+
                          this.signo[3]+this.fuerza+"["+"1/s"+"]";    
     //Factorización
     this.ecuacionFac[0]='X(s)';
     this.ecuacionFac[1]='[';
     //this.ecuacionFac[2]=this.concatenar(this.ecuacionLaplace,1); // este además es el denomnador
     this.ecuacionFac[2]=this.signo[0]+this.entradaM+"s^2"+
                         this.signo[1]+this.entradaK+"s"+
                         this.signo[2]+this.entradaB;
     this.ecuacionFac[3]=']';
     this.ecuacionFac[4]='=';
     this.ecuacionFac[5]=this.signo[3]+this.fuerza+"["+"1/s"+"]";  
     this.resultado44=this.concatenar(this.ecuacionFac,0);

     //Resultado Final
     
      /*/*
    //Factorizando

    //this.resultado111=  this.signo[0]+this.entradaM+"L{"+'x"'+"}"+ 
                        this.signo[1]+this.entradaK+"L{"+"x'"+"}"+
                        this.signo[2]+this.entradaB+"L{"+"x"+"}"+"="+
                        "L{" + this.concatenarVectorIndex(this.ecuacionInicial,10,this.ecuacionInicial.length-1)+"}";
                    
    

     //sobre escribo en la ecuacion inicial los valore de m,k,b
     this.ecuacionLaplace= [this.signo[0],this.entradaM,'(s^2)','X(s)',
     this.signo[1],this.entradaK,'s','X(s)',
     this.signo[0],this.entradaB,'X(s)','=','F(s)'];
                        this.resultado1111=  this.resultado1=this.concatenar(this.ecuacionLaplace,0);
   
    //this.resultado1=this.concatenar(this.ecuacionLaplace,0);
    
    //repartimos la transformada de laplace

  
   
  
    //Despeje de la ecuación
    //denominador
    this.resultado3=  this.ecuacionFac[2];
    */
    this.variable=1;

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
      for(var i=0; i<6;i++){
        this.signo[i]=this.funSigno(vector[i]);
      }
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
        case 3: 
        if(this.btnSigno[3]==1){
          this.btnSigno[3]=0;
        }else if(this.btnSigno[3]==0){
          this.btnSigno[3]=1;
        } 
        break;
        case 4: 
        if(this.btnSigno[4]==1){
          this.btnSigno[4]=0;
        }else if(this.btnSigno[4]==0){
          this.btnSigno[4]=1;
        } 
        break;

        case 5: 
        if(this.btnSigno[5]==1){
          this.btnSigno[5]=0;
        }else if(this.btnSigno[5]==0){
          this.btnSigno[5]=1;
        } 
        break;
      }

         
      
    }

    funSimplificar(numeador:number,denomidado:number[]){
        
    }

    concatenarVectorIndex(vector:string[],indexIni:number,indexFin:number):string{
      var cadenaVector:string='';
      for(var i=indexIni;i<=indexFin;i++){
        cadenaVector+=vector[i];
      }
      return cadenaVector;
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

    
