var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/warchess");

var uniInf = {num:Number, nombre:String, ataque:Number, tipoAtq:String, defensa:Number, precision:Number, PV:Number, alcance:Number, movimiento:Number, captura:Number, debilidad:String, url:String}
var uniInf_schema = new Schema(uniInf);
var Inf = mongoose.model("UnidadesInfanteria", uniInf_schema);

var nueva_inf = new Inf({num:1, nombre:"soldado", ataque:25, tipoAtq:"balas", defensa:10, precision:80, PV:100, alcance:1, movimiento:3, captura:50, debilidad:"explosion", url:"../public/img/infanteria01.png"});
nueva_inf.save(function(err){ console.log(err);});

var nueva_inf = new Inf({num:2, nombre:"anti-tanque", ataque:50, tipoAtq:"penetrantes", defensa:15, precision:65, PV:120, alcance:1, movimiento:2, captura:50, debilidad:"balas", url:"../public/img/infanteria02.png"});
nueva_inf.save(function(err){ console.log(err);});