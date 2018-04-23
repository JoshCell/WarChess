//Server.js

//@autor: josh cell

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var userDAO = require('./UserDAO').UserDAO;

//Para acceder a los parametros de las peticiones POST

//app.use(bodyParser()); DEPRECATED
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Mongodb config
var mdbconf = {
    host: 'localhost',
    port: '27017',
    db: 'warchat' //nombre del tutorial: chatSS
};

// Get a mondoDB connection and start application

MongoClient.connect('mongodb://'+mdbconf.host+':'+mdbconf.port+'/'+mdbconf.db, function(err, db){
   if(err) return new Error('Connection to mongodb unsuccessful');
    
    var usersDAO = new userDAO(db); //Inicializar userDAO
    var onlineUsers = [];
    
    //Configuramos el sistema de ruteo para las peticiones web
    
    app.get('/signup', function(req, res){
        res.sendFile(__dirname + '/Chat-SS/views/signup.html');
    });
    
    app.post('/signup', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        
        usersDAO.addUser(username, password, email, function (err, user) {
            if (err) {
                res.send({ 'error': true, 'err': err});
            }else{
                user.password = null;
                res.send({ 'error': false, 'user': user});
            }
        });
    });
    
    app.post('/login', function (req, res){
        var username = req.body.username;
        var password = req.body.password;
        
        usersDAO.validateLogin(username, password, function (err, user){
            if (err){
                res.send({'error': true, 'err':err});
            }else{
                user.password = null;
                res.send({ 'error': false, 'user': user});
            }
        });
    });
    
    //css and js request
    app.get('/css/foundation.min.css', function (req, res){
        res.sendFile(__dirname + '/Chat-SS/views/css/foundation.min.css');
    });
    
    app.get('/css/normalize.css', function (req, res){
        res.sendFile(__dirname + '/Chat-SS/views/css/normalize.css');
    });
    
    app.get('/css/foundation.min.js', function (req, res){
        res.sendFile(__dirname + '/Chat-SS/views/js/foundation.min.js');
    });
    
    app.get('*', function(req, res){
        res.sendFile(__dirname + '/Chat-SS/views/chat.html');
    });


    //Configuramos SOcket.IO para estar a la escucha de nuevas conexiones.

    io.on('connection', function(socket){
        console.log('New user connected');

        //Cada nuevo cliente solicita con este evento la lista de usuarios conectados en el momento.

        socket.on('all online users', function(){
            socket.emit('all online users', onlineUsers);
        });

        //Cada nuevo socket deberá estar a la escucha del evento 'chat message', el cual se activa cada vez que un usuario envia un mensaje.

        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });

        //Mostramos en consola cada vez que un usuario se desconecte del sistema.

        socket.on('disconnect', function(){
            onlineUsers.splice(onlineUsers.indexOf(socket.user), 1);
            io.emit('remove user', socket.user);
            console.log('User disconnected');
        });

        socket.on('new user', function (nuser){
            socket.user = nuser;
            onlineUsers.push(nuser);
            io.emit('new user', nuser);
        });
    });

//Iniciamos la aplicación en el puerto 3000

    http.listen(3000, function(){
        console.log('listening on *:3000');
    });
});
