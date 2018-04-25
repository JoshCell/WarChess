var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/warchess");

var terreno = {num:Number, nombre:String, defensa:Number, precision:Number, freno:Number, blocMecs: Boolean, blocInf: Boolean, url:String}
var terreno_schema = new Schema(terreno);
var Ter = mongoose.model("Terrenos", terreno_schema);

var nuevo_terreno = new Ter({num:1, nombre:"campo", defensa:5, precision:10, freno:1, blocMecs:false,blocInf:false,url:"../public/img/terreno01.png"});
nuevo_terreno.save(function(err){ console.log(err);});