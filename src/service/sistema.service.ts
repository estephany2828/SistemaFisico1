import { Injectable } from '@angular/core';

@Injectable()

export class SistemaService{
    m:number;
    k:number;
    b:number;
    constructor(){
        this.m=0;
        this.k=0;
        this.b=0;
    }

    public  getValorM():number{
        return this.m;
    }
    
    public  getValorK():number{
        return this.k;
    }
    public  getValorB():number{
        return this.b;
    }
    public  setValorM(m:number){
        this.m = m;
    }
    public  setValorK(k:number){
        this.m = k;
    }
    public  setValorB(b:number){
        this.m = b;
    }

}
