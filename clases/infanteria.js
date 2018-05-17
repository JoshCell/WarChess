module.exports = 
    class Infanteria{
        constructor(num, id, nombre, ataque, tipoAtq, defensa, precision, PV, alcance, movimiento, captura, debilidad, url){
            this.num = num;
            this.id = id;
            this.nombre = nombre;
            this.ataque = ataque;
            this.tipoAtq = tipoAtq;
            this.defensa = defensa;
            this.precision = precision;
            this.PV = PV;
            this.alcance = alcance;
            this.movimiento = movimiento;
            this.captura = captura;
            this.debilidad = debilidad;
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
        getAtaque(){
            return this.ataque;
        }
        getTipoAtq(){
            return this.tipoAtq;
        }
        getDefensa(){
            return this.defensa;
        }
        getPrecision(){
            return this.precision;
        }
        getPV(){
            return this.PV;
        }
        getAlcance(){
            return this.alcance;
        }
        getMovimiento(){
            return this.movimiento;
        }
        getCaptura(){
            return this.captura;
        }
        getDebilidad(){
            return this.debilidad;
        }
        getUrl(){
            return this.url;
        }

        realizarAtaque(){ //en este método habrá que calcular el ataque teniendo en cuenta: ataque, tipoAtq y precision de ESTA unidad,
                          //atributo defensa y precisión de la casilla, y la defensa y debilidad de la unidad enemiga. Controlar también el contraataque mediante el alcance si es igual o mayor.

        }
            
            
    }