var socket = io.connect('http://localhost:3000', { 'forceNew': true });

var nomJug = "";
var id = null;





///////////////////////////////////////////////////////


socket.on("jugador", function(nombre,puntos,unidades){
    nomJug = nombre;
    
})


$("#turn").on("click", function(e){
    socket.emit('pass_turn');
})



socket.on('messages', function(data){
    console.log(data);
    render(data);
})

socket.on("textTurno", function(turno){
        console.log(turno);
        cambiarTurno(turno);
});

socket.on("inicioUnidades", function(unidades){
    posicionarUnidades(unidades);
});

function posicionarUnidades(unidades){
    var svg = d3.select(document.getElementById("unidades"));
    var units = unidades.getUnidades();
        //for(var x=0; x<units.length; x++){
          var unitsGroup = svg.append("g")
                .attr("class", "units");
                unitsGroup.append("image")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("xlink:href", units[10][4]);
                
            
        //}
                        
}

////////////////////////////FUNCIONES////////////////////////////

function render(data) {
    var html = data.map(function(elem, index){
        return(`<div><strong>${elem.author}</strong>:<em>${elem.text}</em></div>`);
    }).join(" ");
     
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    
    socket.emit('new-message', payload);
    return false;
}

function cambiarTurno(turno){
    var res = turno.map(function(elem, index){
        return elem.turno++;
    });
    
    document.getElementById('testTurno').innerHTML = res;
}

/*function cambiarTurno(turno){
    var html = turno.map(function(elem, index){
        var res;
        if(elem.turno%2==0){
            res = `<strong>Turno ${elem.turno}</strong>:<em>Jugador Azul</em>`
        }else{
            res = `<strong>Turno ${elem.turno}</strong>:<em>Jugador Rojo</em>`
        }
        return res;
    }).join(" ");
    
    document.getElementById('textTurno').innerHTML = html;
}

function newTurn(e){
    var payload = {
        turno: document.getElementById; 
        text: 
    }
}*/