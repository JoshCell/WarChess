///////////////REQUIRES////////////////////////
var bodyParser  = require('body-parser');
var express     = require('express');
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var userDAO     = require('./dao/UserDAO').UserDAO;
var messageDAO  = require('./dao/messagesDAO').MessageDAO;
var assert      = require('assert');
//var db          = require('./config/db');
var mongoose    = require('mongoose');
///////////////////////////////////////////////

var app = express();
var port = process.env.PORT || 3001


// Para acceder a los parametros de las peticiones POST
//app.use(bodyParser()); DEPRECATED
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

////////////CONEXIÓN CON MONGOOSE/MONGODB///////////

mongoose.connect('mongodb://localhost:27017/warchess', (err, res) =>{
    if(err){
        return console.log(`Error al tratar de conectar con la base de datos: ${err}`)
    }console.log("Conexión con la base de datos establecida...")
    
    app.listen(port, ()=> {
        console.log('API REST corriendo en http://localhost:${port}')
    })
})
//////////////////////////////////////////////////
///////////////////////CARGAR SCHEMAS////////////

var infanteria = require("../modelos/schema").inf;
var mecanizada = require("../modelos/schema").mec;
var terreno = require("../modelos/schema").ter;

///////////////////VARIABLES GENERALES/////////////

var ips = [];
var listaIds = [];

//////////////////////////////////////////////////

///////////////APP FUNCTIONS////////////////////

app.use(express.static('public'));

app.get('/hello', function(req, res){
    res.status(200).send("Hello World!")
});

app.post('/hello', function (req, res){
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
});

////////////////CONEXIÓN///////////////////////

io.on('connection', function(socket){
    console.log("Alguien se ha conectado");
    socket.emit('messages', messages);
    
    socket.on('new-message', function(data){
        messages.push(data);
        
        io.sockets.emit('messages', messages);
    });
});

/////////////////////////////CARGA TABLERO/////////////////

app.get('/principal_prototipo.html', function(req, res){
    res.sendFile(__dirname + '../principal_prototipo.html');
});


/*io.('connection', function(socket){
    if(ips.length<2){
        var addr = socket.handshake;
        if(ips.length < 2){
            listaIds.push(socket.id);
            ips.push(addr.address);
            
        }
    }
})*/

//////////////////////////////////////////////

infanteria.findOne({'num':1}, function(err, inf){
    if(err) return handleError(err);
    
    var infanteria01 = new infanteria(1, inf.nombre, inf.ataque, inf.tipoAtq, inf.defensa, inf.precision, inf.PV, inf.alcance, inf.movimiento, inf.captura, inf.debilidad, inf.url)
}) 