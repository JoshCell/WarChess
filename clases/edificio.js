'use strict'
module.exports = 
    class Edificio{
        constructor(num, id, nombre, captura, url){
            this.num = num;
            this.id = id;
            this.nombre = nombre;
            this.captura = captura;
            this.url = url;
    }
        
    getNum(){ //Devuelve el num de la infanteria
        return this.num;
    }

    getId(){
        return this.id;
    }

    getNombre(){ 
        return this.nombre;
    }
    
    getCaptura(){
        return this.captura;
    }
    
    getUrl(){
        return this.url;
    }
}
