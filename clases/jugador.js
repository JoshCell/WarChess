'use strict'
module.exports = 
class jugador{
        constructor(nombre, unidades){
            this.nombre = nombre;
            this.puntos = 0;
            this.unidades = unidades;
        }
        
        getNombre(){
            return this.nombre;
        }
        getPuntos(){
            return this.puntos;
        }
        getUnidades(){
            return this.unidades;
        }
    }
