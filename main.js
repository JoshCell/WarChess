'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



var Users = require('./models/users');

var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(server);

//////////////////CLASES//////////////////////
var Jugador     = require("./clases/jugador");
var Infanteria  = require("./clases/infanteria");
var Mecanizada  = require("./clases/mecanizada");
var Edificio    = require("./clases/edificio");

///////////////////////////////////////////////

////////////////OBJETOS DE UNIDADES//////////////////////
var unidadesRojo = new Array(11);
var unidadesAzul = new Array(11);

for(var x=0; x<11; x++){
    if(x<6){
        if(x<3){
            unidadesRojo[x] = new Infanteria(1,x+"R","soldado", 25, "balas", 10, 80, 100, 1, 3, 50, "explosion", "./public/img/infanteria01red.png");
            unidadesAzul[x] = new Infanteria(1,x+"A","soldado", 25, "balas", 10, 80, 100, 1, 3, 50, "explosion", "./public/img/infanteria01blue.png");
        }else{
            unidadesRojo[x] = new Infanteria(2,x+"R","anti-tanque", 50, "penetrantes", 15, 65, 120, 1, 2, 50, "balas", "./public/img/infanteria02red.png");
            unidadesAzul[x] = new Infanteria(2,x+"A","anti-tanque", 50, "penetrantes", 15, 65, 120, 1, 2, 50, "balas", "./public/img/infanteria02blue.png");
        }
    }if(x>5 && x<10){
        if(x==6 || x==7){
            unidadesRojo[x] = new Mecanizada(1,x+"R","tanque",90,"explosion",35,60,250,1,4,"penetrantes",75,9,"./public/img/mecanizada01red.png");
            unidadesAzul[x] = new Mecanizada(1,x+"A","tanque",90,"explosion",35,60,250,1,4,"penetrantes",75,9,"./public/img/mecanizada01blue.png");
        }else{
            unidadesRojo[x] = new Mecanizada(2,x+"R","artilleria",80,"explosion",15,50,175,3,3,"explosion",70,5,"./public/img/mecanizada02red.png");
            unidadesAzul[x] = new Mecanizada(2,x+"A","artilleria",80,"explosion",15,50,175,3,3,"explosion",70,5,"./public/img/mecanizada02blue.png");
        }
    }if(x==10){
            unidadesRojo[x] = new Edificio(1, x+"R", "base", 100, "./public/img/BaseRed.png");
            unidadesAzul[x] = new Edificio(1, x+"A", "base", 100, "./public/img/BaseBlue.png");
    }
}

////////////////OBJETOS DE JUGADORES////////////////////////
var jugador = new Array(2);
jugador[0] = new Jugador("Jugador Rojo", unidadesRojo);
jugador[1] = new Jugador("Jugador Azul", unidadesAzul);

////////////////////LISTA DE JUGADORES///////////////
var arrayips = [];
var arrayid = [];
/////////////////////////////////////////////////

var dir = __dirname;
var messages = [{
    id: 1,
    text: "Mensaje",
    author: "Nick"
}];

/////////////////////////VARIABLES TURNOS///////////////////////////
var _turn = 0;
var currentTurn = 0;
var timeOut;
var MAX_WAITING = 300000;

//////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile(dir + "public/index.html");
});

io.on('connection', function(socket) {
   
    ///////////////////////CREACIÓN Y CONTROL DE JUGADORES DENTRO DE PARTIDA////////////////////////// 
    if(arrayips.length<2){
        var address = socket.handshake;
        console.log(address.address);
        if(arrayips.length<2){
            arrayid.push(socket.id)
            arrayips.push(address.address);
            socket.emit("jugador", jugador[arrayips.length-1].getNombre(),jugador[arrayips.length-1].getPuntos(),jugador[arrayips.length-1].getUnidades());
            //console.log(jugador[arrayips.length-1]);
        }
    }else{
        console.log("Alcanzado límite máximo de jugadores, espere...");
    }
    /////////////////POSICIONAMIENTO INICIAL/////////////////
    socket.on("posicionamiento", function(jugador){
        console.log("Posicionando...");
        io.sockets.emit("inicioUnidades", jugador);
    });
    
    ///////////////////////////////////////////////////////////////////////////////////////
    /////////////////EMISIÓN DE MENSAJES DE CHAT/////////////////
    socket.emit('messages', messages);
    
    socket.on('new-message', function(data) {
        messages.push(data);
        
        io.sockets.emit('messages', messages);
    });
    
    ////////////////////////TURNOS////////////////////////////
    
    socket.on('pass_turn', function(){
        if(jugador[_turn] == socket){
            resetTimeOut();
            next_turn();
        }
    });
    
    socket.on('disconnect', function(){
        console.log('Un jugador se ha desconectado');
        jugador.splice(jugador.indexOf(socket),1);
        _turn--;
    })
    /*socket.emit('turno', cambioTurno);
    socket.on("turno", function(cambioTurno){
        cambioTurno++;
        io.sockets.emit('turno', cambioTurno)
    });*/
    ////////////////////////////////////////////////////////
});


server.listen(3000, function(){
    console.log("Servidor corriendo en 3000");
    //console.log(unidadesRojo);
    //console.log(unidadesAzul);
    console.log(jugador);
});







////////////////////////////////////////////////FUNCIONES/////////////////////////////////////////////////////

function next_turn(){
    _turn = currentTurn++ % jugador.length;
    jugador[_turn].emit('your_turn');
    console.log("next turn triggered " , _turn);
    triggerTimeout();
}

function triggerTimeout(){
    timeOut = setTimeout(() =>{
        next_turn();
    }, MAX_WAITING);
}

function resetTimeOut(){
    if(typeof timeOut === 'object'){
        console.log("timeout reset");
        clearTimeout(timeOut);
    }
}
























//////////////////////////EJEMPLO NODEJS + SOCKET////////////////////////////////////////////////////////

/*io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets')
    socket.emit('messages', messages);
    
    socket.on('new-message', function(data) {
        messages.push(data);
        
        io.sockets.emit('messages', messages);
    });
});


server.listen(3000, function(){
    console.log("Servidor corriendo en 3000");
});*/

////////////////////////////EJEMPLO NODEJS + MONGODB/////////////////////////////////////////////////

/*
app.get('/warchess/users', (req, res) => {
    res.status(200).send({users: []});
});

app.get('/warchess/users/:name', (req, res) =>{
    
});

app.post('/warchess/users', (req, res) => { //PENDIENTE SOLUCIONAR EL POST Y EL SCHEMA USERS QUE NO FUNCIONA BIEN
    console.log('POST /warchess/users')
    console.log(req.body)
    
    let user = new Users()
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    
    user.save((err, userStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
    res.status(200).send({user: userStored});
    })
})

app.put('/warchess/users/:name', (req, res) => {
    
});

app.delete('/warchess/users/:name', (req, res) => {
    
});

mongoose.connect('mongodb://localhost:27017/warchess', (err, res) => {
    if(err){
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
//mongoose.connect('mongodb://localhost/warchess/');
    console.log('Conexión a la base de datos establecida...')
    
    app.listen(port, () => {
        console.log(`Corriendo en el puerto ${port}`);
    });
});
*/


