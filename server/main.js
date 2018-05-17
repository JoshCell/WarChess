///////////////REQUIRES////////////////////////
var bodyParser  = require('body-parser');
var express     = require('express');
var app         = express();
var server      = require('http').Server(app);
var io          = require('socket.io')(server);
var MongoClient = require('mongodb').MongoClient;
var routes      = require('./routes/routes.main');
//var userDAO     = require('./dao/UserDAO').UserDAO;
//var messageDAO  = require('./dao/messagesDAO').MessageDAO;
var assert      = require('assert');
//var db          = require('./config/db');
//var mongoose    = require('mongoose');

//////////////////CLASES//////////////////////
var Jugador     = require("../clases/jugador");
var Infanteria  = require("../clases/infanteria");
var Mecanizada  = require("../clases/mecanizada");
var Edificio    = require("../clases/edificio");

///////////////////////////////////////////////


//var port = process.env.PORT || 3001


// Para acceder a los parametros de las peticiones POST
//app.use(bodyParser()); DEPRECATED
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

////////////CONEXIÓN CON MONGOOSE/MONGODB///////////

/*mongoose.connect('mongodb://localhost:27017/warchess', (err, res) =>{
    if(err){
        return console.log(`Error al tratar de conectar con la base de datos: ${err}`)
    }console.log("Conexión con la base de datos establecida...")
    
    app.listen(port, ()=> {
        console.log('API REST corriendo en http://localhost:${port}')
    })
})*/

app.get('/juego', function (req, res) {
    res.sendFile( __dirname + '../mainGame.html');
  });



////////////////OBJETOS DE UNIDADES//////////////////////
var unidadesRojo = new Array(11);
var unidadesAzul = new Array(11);

for(var x=0; x<11; x++){
    if(x<6){
        if(x<3){
            unidadesRojo[x] = new Infanteria(1,x+"R","soldado", 25, "balas", 10, 80, 100, 1, 3, 50, "explosion", "../public/img/infanteria01red.png");
            unidadesAzul[x] = new Infanteria(1,x+"A","soldado", 25, "balas", 10, 80, 100, 1, 3, 50, "explosion", "../public/img/infanteria01blue.png");
        }else{
            unidadesRojo[x] = new Infanteria(2,x+"R","anti-tanque", 50, "penetrantes", 15, 65, 120, 1, 2, 50, "balas", "../public/img/infanteria02red.png");
            unidadesAzul[x] = new Infanteria(2,x+"A","anti-tanque", 50, "penetrantes", 15, 65, 120, 1, 2, 50, "balas", "../public/img/infanteria02blue.png");
        }
    }if(x>5 && x<10){
        if(x==6 || x==7){
            unidadesRojo[x] = new Mecanizada(1,x+"R","tanque","explosion",35,60,250,1,4,"penetrantes",75,9,"../public/img/mecanizada01red.png");
            unidadesAzul[x] = new Mecanizada(1,x+"A","tanque","explosion",35,60,250,1,4,"penetrantes",75,9,"../public/img/mecanizada01blue.png");
        }else{
            unidadesRojo[x] = new Mecanizada(2,x+"R","artilleria","explosion",15,50,175,3,3,"explosion",70,5,"../public/img/mecanizada02red.png");
            unidadesAzul[x] = new Mecanizada(2,x+"A","artilleria","explosion",15,50,175,3,3,"explosion",70,5,"../public/img/mecanizada02blue.png");
        }
    }if(x==10){
            unidadesRojo[x] = new Edificio(1, x+"R", "base", 100, "../public/img/BaseRed.png");
            unidadesAzul[x] = new Edificio(1, x+"A", "base", 100, "../public/img/BaseBlue.png");
    }
}

////////////////OBJETOS DE JUGADORES////////////////////////
var jugador = new Array(2);
jugador[0] = new Jugador("Jugador Rojo", unidadesRojo);
jugador[1] = new Jugador("Jugador Azul", unidadesAzul);

//////////////////////////////////////////////////

///////////////APP FUNCTIONS////////////////////

app.use(express.static('public'));

//app.get('/', routes.index);

//app.get('/hello', function(req, res){
  //  res.status(200).send("Hello World!")
//});

/*app.post('/hello', function (req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    
    usersDAO.addUser(username, password, email, function (err, user) {
      if (err) {
        res.send({ 'error': true, 'err': err});
      }
      else {
        //user.password = null;
        res.send({ 'error': false, 'user': user });
      }
    });  
});*/

////////////////CONEXIÓN Y COMUNICACIÓN///////////////////////

var ips = [];
var ids = [];
io.on('connection', function(socket) {
	if(ips.length < 2){
		var address = socket.handshake; //Se obtiene la IP de quien se acaba de conectar
		if(ips.length<2){ 
			ids.push(socket.id); //Se añade la ID a la array
			ips.push(address.address); //Se añade la IP a la array
			//socket.emit("jugador", jugador[ips.length-1].getNom(), colores[ips.length-1], jugador[ips.length-1].getdinero());
            //if(ips.length == 1){
                socket.emit("jugador", jugador[ips.length-1].getNombre(), jugador[ips.length-1].getPuntos(), jugador[ips.length-1].getUnidades());
            //}
            
			//io.sockets.emit("torn", turno);
			console.log("Usuario conectado");
		}
	}else{
		console.log("Limite superado");
		//socket.emit("nombre", "Espectador", "white", 0); //Espectador cuando la array esta completa
	}

	//socket.emit("posiciones", mov); //Muestra las casillas en la posicion donde se encuentre en ese momento de la partida
	//socket.emit("messages", messages); //Muestra los mensajes del chat

    /*//Chat
    console.log('Alguien se ha conectado con Sockets');
    console.log(arrayips);
    console.log(arrayid);
    socket.on('new.message', function(data){ //Funcion para guardar en la base de dados el mensaje enviado en el chat
    messages.push(data);
    var mensaje = new Msg({autor:data.author, texto:data.text}); 
    mensaje.save(function(err){ console.log(err); });
    io.sockets.emit("messages", messages); //Mostrar a todos el mensaje enviado*/
});

//});

/////////////////////////////CARGA TABLERO/////////////////

/*app.get('public/mainGame.html', function(req, res){
    res.sendFile(__dirname + 'public/mainGame.html');
});


/*io.('connection', function(socket){
    if(ips.length<2){
        var addr = socket.handshake;
        if(ips.length < 2){
            listaIds.push(socket.id);
            ips.push(addr.address);
            
        }
    }
})

//////////////CONSEGUIR DATOS INFANTERIA MONGOOSE//////////////

app.get("/UnidadesInfanteria", function(req, res){
    UnidadesInfanteria.find({}, function(err, infanteria){
        res.status(200).send(infanteria)
    });
});


//////////////////////////////////////////////

infanteria.findOne({'num':1}, function(err, inf){
    if(err) return handleError(err);
    
    var infanteria01 = new infanteria(1, inf.nombre, inf.ataque, inf.tipoAtq, inf.defensa, inf.precision, inf.PV, inf.alcance, inf.movimiento, inf.captura, inf.debilidad, inf.url)
}); */
    
server.listen(3000, function() {
    console.log('listening on *:3000');
});