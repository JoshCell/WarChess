module.exports = 
    class Infanteria{
        constructor(num, nombre, ataque, tipoAtq, defensa, precision, PV, alcance, movimiento, debilidad, combustible, municion, url){
            this.num = num;
            this.nombre = nombre;
            this.ataque = ataque;
            this.tipoAtq = tipoAtq;
            this.defensa = defensa;
            this.precision = precision;
            this.PV = PV;
            this.alcance = alcance;
            this.movimiento = movimiento;
            this.debilidad = debilidad;
            this.combustible = combustible;
            this.municion = municion;
            this.url = url;
        }
        getNum(){ //Devuelve el num
            return this.num;
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
        
        getDebilidad(){
            return this.debilidad;
        }
        
        getCombustible(){
            return this.combustible
        }
        
        getMunicion(){
            return this.municion;
        }
        getUrl(){
            return this.url;
        }

        realizarAtaque(){ //en este método habrá que calcular el ataque teniendo en cuenta: ataque, tipoAtq, municion y precision de ESTA unidad,
                          //atributo defensa y precisión de la casilla, y la defensa y debilidad de la unidad enemiga. Controlar también el contraataque mediante el alcance si es igual o mayor.

        }
    }