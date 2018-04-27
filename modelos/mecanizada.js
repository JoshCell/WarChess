var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/warchess");

var uniMec ={num:Number, nombre:String, ataque:Number, tipoAtq:String, defensa: Number, precision:Number, PV:Number, alcance:Number, movimiento:Number, debilidad:String, combustible:Number, municion:Number, url:String}
var uniMec_schema = new Schema(uniMec);
var Mec = mongoose.model("UnidadesMecanizadas");

var nueva_mec = new Mec = ({num:1, nombre:"tanque", tipoAtq:"explosion", defensa:35, precision:60, PV:250, alcance:1, movimiento:4, debilidad:"penetrantes", combustible:75, municion:9, url:"../public/img/mecanizada01.png"});
nueva_mec.save(function(err){ console.log(err);});

var nueva_mec = new Mec = ({num:2, nombre:"artilleria", tipoAtq:"explosion", defensa:15, precision:50, PV:175, alcance:3, movimiento:3, debilidad:"explosion", combustible:70, municion:5, url:"../public/img/mecanizada02.png"});
nueva_mec.save(function(err){ console.log(err);});