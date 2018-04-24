var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/warchess");


///////////////////TERRENOS///////////////////////////

var terreno = {num:Number, nombre:String, defensa:Number, precision:Number, freno:Number, blocMecs: Boolean, blocInf: Boolean, url:String}
var terreno_schema = new Schema(terreno);
var Ter = mongoose.model("Terrenos", terreno_schema);

module.exports.ter = Ter;
/*
    - num: Numero de tipo de terreno
    - nombre: Nombre de tipo de terreno
    - defensa: número porcentual que se aplica a la defensa de la unidad encima de este terreno.
    - precision: número porcentual que se aplica a la precisión de la unidad encima de este terreno.
    - freno: valor en el que ralentiza el movimiento de una unidad que pasa por encima de este terreno.
    - blocMecs: true si bloquea el paso a unidades mecanizadas, false si no bloquea unidades de infantería.
    - blocInf: true si bloquea el paso a unidades de infantería, false si no bloquea unidades de infantería.
    - url: dirección donde estará ubicado el sprite de este terreno
*/

///////////////////////////////////////////////////////////////////

////////////////////////UNIDADES INFANTERIA////////////////////////

var uniInf = {num:Number, nombre:String, ataque:Number, tipoAtq:String, defensa:Number, precision:Number, PV:Number, alcance:Number, movimiento:Number, captura:Number, debilidad:String}
var uniInf_schema = new Schema(uniInf);
var Inf = mongoose.model("UnidadesInfanteria", uniInf_schema);

module.exports.inf = Inf;
/*

    - num: numero del tipo de unidad de infantería.
    - nombre: nombre del tipo de unidad de infanteria.
    - ataque: valor numérico del ataque.
    - tipoAtq: Tipo de ataque.
    - defensa: valor numérico de la defensa.
    - precision: valor numérico de la precisión.
    - PV: Puntos de vida de la unidad (al llegar a cero, muere).
    - alcance: longitud de casillas que alcanza el ataque.
    - movimiento: cantidad de casillas en las que puede moverse la unidad.
    - captura: valor numérico de la capacidad de captura de la abse (provisional y por determinar).
    - debilidad: valor que coincide con un tipo de ataque (tipoAtq). Si coincide, aumentará el daño que recibe la unidad.
*/
///////////////////////////////////////////////////////////////////

////////////////////////UNIDADES MECANIZADAS///////////////////////

var uniMec ={num:Number, nombre:String, ataque:Number, tipoAtq:String, defensa: Number, precision:Number, PV:Number, alcance:Number, movimiento:Number, debilidad:String, combustible:Number, municion:Number}
var uniMec_schema = new Schema(uniMec);
var Mec = mongoose.model("UnidadesMecanizadas");

module.exports.mec = Mec;
/*

    - num: numero del tipo de unidad mecanizada.
    - nombre: nombre del tipo de unidad mecanizada.
    - ataque: valor numérico del ataque.
    - tipoAtq: Tipo de ataque.
    - defensa: valor numérico de la defensa.
    - precision: valor numérico de la precisión.
    - PV: Puntos de vida de la unidad (al llegar a cero, se destruye).
    - alcance: longitud de casillas que alcanza el ataque.
    - movimiento: cantidad de casillas en las que puede moverse la unidad.
    - debilidad: valor que coincide con un tipo de ataque (tipoAtq). Si coincide, aumentará el daño que recibe la unidad.
    - combustible: Valor numérico de la gasolina que le queda. SI llega a cero, no puede moverse.
    - municion: valor numérico de la munición restante. Si llega a cero no puede atacar.
*/

///////////////////////////////////////////////////////////////////

///////////////////////////////MENSAJES////////////////////////////



///////////////////////////////////////////////////////////////////