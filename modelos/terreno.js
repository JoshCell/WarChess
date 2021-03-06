var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/warchess");

var terreno = {num:Number, nombre:String, defensa:Number, precision:Number, freno:Number, blocMecs: Boolean, blocInf: Boolean, url:String}
var terreno_schema = new Schema(terreno);
var Ter = mongoose.model("Terrenos", terreno_schema);

var nuevo_terreno = new Ter({num:1, nombre:"campo", defensa:5, precision:10, freno:1, blocMecs:false,blocInf:false,url:"../public/img/terreno01.png"});
nuevo_terreno.save(function(err){ console.log(err);});

var nuevo_terreno = new Ter({num:2, nombre:"montaña", defensa:20, precision:20, freno:3, blocMecs:true, blocInf:false, url:"../public/img/terreno02.png"});
nuevo_terreno.save(function(err){ console.log(err);});

var nuevo_terreno = new Ter({num:3, nombre:"bosque", defensa:10, precision:-5, freno:2, blocMecs:false, blocInf:false, url:"../public/img/terreno03.png"});
nuevo_terreno.save(function(err){ console.log(err);});
