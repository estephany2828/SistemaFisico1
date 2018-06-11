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
  fun:string='';
  funP:string='';
  fun1:string='';
  funP1:string='';
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
  con:number; 
  numero:string;
  numeroS:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.variable==0;

  }
  resolver(){
     }
 
  mostrar(){
    this.funRecorrerSigno(this.btnSigno);   
    this.entradaM=this.entradaM.substring(0,this.entradaM.length);
    this.entradaK=this.entradaK.substring(0,this.entradaK.length);
    this.entradaB=this.entradaB.substring(0,this.entradaB.length);
    this.fuerza=this.fuerza.substring(0,this.fuerza.length); 
    this.fun=this.fun.substring(0,this.fun.length); 
    this.funP=this.funP.substring(0,this.funP.length);  

    //leemos las condiciones iniciales

    //ecuacion en terminos del desplazamiento
    this.ecuacionInicial= [this.signo[0],this.entradaM,'x"',
                           this.signo[1],this.entradaK,"x'",
                           this.signo[2],this.entradaB,'x',"=",this.signo[3],this.fuerza,"f(t)"];    
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
                      
    
    this.apliLaplace[3]=  this.signo[0]+this.entradaM+"["+"s^2"+'X(s)'+"-"+"s"+'x(0)'+"-"+"x'(0)"+"]"+ 
                          this.signo[1]+this.entradaK+"["+"s"+'X(s)'+"-"+"x(0)"+"]"+ 
                          this.signo[2]+this.entradaB+"["+'X(s)'+"]"+"="+
                          this.signo[3]+this.fuerza+"F(s)";//+"["+"1/s"+"]"; 
        
  this.apliLaplace[4]=    this.signo[0]+this.entradaM+"["+"s^2"+'X(s)'+"-"+"s"+this.fun+"-"+this.funP+"]"+ 
                          this.signo[1]+this.entradaK+"["+"s"+'X(s)'+"-"+this.fun+"]"+ 
                          this.signo[2]+this.entradaB+"["+'X(s)'+"]"+"="+
                          this.signo[3]+this.fuerza+"F(s)";//+"["+"1/s"+"]";

  //convertimo a number para multiplicar n[m]
  this.fun1=this.fun;
  this.funP1=this.funP;
  this.con=parseFloat(this.fun1) ;         
  this.fun1=(parseFloat(this.fun1)*parseFloat(this.entradaM)).toString();
  this.funP1=(parseFloat(this.funP1)*parseFloat(this.entradaM)).toString();
  //multiplicacion de signos


  this.apliLaplace[5]=    this.signo[0]+"["+this.entradaM+"s^2"+'X(s)'+
                          this.funConSigno('-',this.signo[5])+"s"+
                          this.fun1+this.funConSigno('-',this.signo[4])+parseFloat(this.funP1)+"]"+ //-----
                          "+"+"["+this.signo[1]+this.entradaK+"s"+'X(s)'
                          +this.funConSigno('-',this.signo[5])+(this.con*parseFloat(this.entradaK)).toString()+"]"+ //-----
                          this.signo[2]+this.entradaB+"["+'X(s)'+"]"+"="+
                          this.signo[3]+this.fuerza+"F(s)";//+"["+"1/s"+"]";    
                          
 this.numero=this.funSumaSigno(
                  // le paso los signos y los numeros
              this.funConSigno('-',this.signo[4]),this.funConSigno('-',this.signo[5]),                                                      
              parseFloat(this.funP1),this.con*parseFloat(this.entradaK));

  this.numeroS =this.numero.substring(0,1);//this.funConSigno(this.funConSigno('-',this.signo[5]),this.funConSigno('-',this.signo[5]));
  this.numero =this.numero.substring(1,this.numero.length);  


  this.apliLaplace[6]=    this.signo[0]+this.entradaM+"s^2"+'X(s)'+                          
                          this.funConSigno('-',this.signo[5])+this.fun1+"s"+
                          this.numeroS+this.numero+ 
                          this.signo[1]+this.entradaK+"s"+'X(s)'+                          
                          this.signo[2]+this.entradaB+'X(s)'+"="+
                          this.signo[3]+this.fuerza+"F(s)"; //+"["+"1/s"+"]";

  
  this.apliLaplace[7]=    "X(s)" + "[" + this.signo[0]+this.entradaM+"s^2" +
                          this.signo[1]+this.entradaK+"s"+
                          this.signo[2]+this.entradaB+ "]" + 
                          this.funConSigno('-',this.signo[5])+this.fun1+"s"+                          
                          this.numeroS+this.numero+                         
                          "="+
                          this.signo[3]+this.fuerza+"F(s)";//+"["+"1/s"+"]";  




  this.apliLaplace[8]=                            
                          this.signo[3]+this.fuerza   //"+["+"1/s"+"]"
                          +this.funConSigno('-',this.funConSigno('-',this.signo[5]))+this.fun1+"s"+
                          this.funConSigno('-',this.numeroS)+                        
                          +this.numero;

  this.apliLaplace[9]=
                          this.signo[0]+this.entradaM+"s^2" +
                          this.signo[1]+this.entradaK+"s"+
                          this.signo[2]+this.entradaB;
   this.variable=1;

    }


    ionViewDidLoad() {
      console.log('ionViewDidLoad ConIniPage');
    }
    funConSigno(s1:string,s2:string):string{
      if(s1.localeCompare('-')&&s2.localeCompare('-')){return '+';}
      else if(s1.localeCompare('+')&&s2.localeCompare('+')){return '+';}
      else{return '-';}
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
  

    funSumaSigno(signo1:string,signo2:string,n1:number,n2:number):string{
      if(signo1.localeCompare('-')&&signo2.localeCompare('-')){return signo1+((n1+n2).toString());}
      else if(signo1.localeCompare('+')&&signo2.localeCompare('+')){return signo1+((n1+n2).toString());}
      else if (signo1.localeCompare('+')&&signo2.localeCompare('-')&&n1>=n2){return signo1+((n1-n2).toString());}
      else if (signo1.localeCompare('+')&&signo2.localeCompare('-')&&n1<=n2){return signo2+((n2-n1).toString());}
      else if (signo1.localeCompare('-')&&signo2.localeCompare('+')&&n1>=n2){return signo1+((n1-n2).toString());}
      else if (signo1.localeCompare('-')&&signo2.localeCompare('+')&&n1<=n2){return signo2+((n2-n1).toString());}     
    
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

    
