


//////////////////////////TABLERO//////////////////////

var gridData = gridGenerator(); //función de generación de tablero/grid
//monitorización por consola del gridData para debug
console.log(gridData);

/////////////////CREAMOS EL SVG DONDE SE CREA TODO EL JUEGO/////////////

var grid = d3.select("#grid")
            .append("svg")
            //.attr('xlink:href', "public/img/Cuadricula.svg")
            //.attr("viewBox", "-300,0,1500, 1500")
            .attr("width", "770px")
            .attr("height", "770px")
            .attr("x", "0px");

///////////SE CREAN LAS FILAS DEL TABLERO//////////////////////////////

var row = grid.selectAll(".row")
            .data(gridData)
            .enter().append("g")
            .attr("class", "row");

//////////////////GENERACIÓN DE CASILLAS Y TERRENOS////////////////////

var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("g")
    .attr("class","square")
    .attr("id", function(d) { return d.id; });
    
            
    var imageTerreno = column.append("image")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .attr('xlink:href',function(d){ return d.img; });
    /////////////////////CAPA DE UNIDADES//////////////////////////
    var squareUnit = column.append("image")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", 96)
        .attr("height", 96)
        .attr("xlink:href", "")
        .attr("id",0)
        .on('click', function(d){
            d.click++;
           if(state == true && tics>0){
                if(d3.select(this).attr('id') == 0 && (d3.select(this).attr('y') < 200 && player == 1) || (d3.select(this).attr('y') > 450 && player == 2)){
                    d3.select(this).attr('xlink:href', imagen).attr('id',unitsLeft + '-' + player);
                    unitsLeft--;
                    tics--;
                    if(tics<1){
                    thisNode.attr("opacity", 0);
                    d.state = false;
                }
            }
        }});

//////////////////VARIABLES GENERALES/////////////////////
var player = 1; // variable de jugador. 1 es jugador Rojo, 2 es jugador Azul
var unitsLeft = 11;
var state;
var imagen = "";
var tics = 0; 
var thisNode;
//////////////////////////////////////////////////////////////////
//////////////////UNIDADES MENU (CLICK Y COLOCAR)/////////////////////
var gridUnitsData = gridUnitsGenerator(player);

var menu = d3.select("#menu")
    .append("svg")
    .attr("width", "290px")
    .attr("height", "1500px")
    .attr("x", "10px")
    .attr("y", "15px");

var unitsMenu = menu.selectAll(".unitsMenu")
            .data(gridUnitsData)
            .enter().append("g")
            .attr("class", "row");

var units = unitsMenu.selectAll(".units")
            .data(function(d) { return d; })
            .enter().append("g")
            .attr("class","units");


var imageUnits = units.append("image")
            .attr("class", "imageUnits")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("width", function(d) { return d.width; })
            .attr("height", function(d) { return d.height; })
            .attr('xlink:href',function(d){ return d.img; })
            .on('click', function(d){
                
                d3.selectAll(d.state==true).attr("opacity", 1);
                //d.state = true;
                d3.selectAll(d.state==false).attr("opacity", 0);
                thisNode = d3.select(this); 
                thisNode.attr("opacity", 0.3);
                state = d.state;
                imagen = d.img;
                tics = d.click;    
        });
///////////////////BOTÓN START GAME//////////////////////////

//////////////////////////VENTANA BOTONES///////////////////////
var buttonData = buttonGenerator();
var ButStartBol = false;
var clickborr = false;
var buttonStart = menu.selectAll(".buttonStart")
            .data(buttonData)
            .enter().append("g")
            .attr("class", "buttonStart");
    var buttonImg = buttonStart.append("image")
            .attr("class", "buttonStr")
            .attr("width", function(d) { return d.width;})
            .attr("height", function(d) { return d.height;})
            .attr("x", function(d) { return d.x;})
            .attr("y", function(d) { return d.y;})
            .attr('xlink:href',"img/buttonStartRed.png")
            .on("click", function(d){
                if(unitsLeft==0){
                    ButStartBol = true; 
                    d3.select(this).attr('xlink:href',"img/buttonStartGreen.png")
                //d3.select(".stsPTextRed").style("opacity", 1)
                //d3.select(".stsPTextBlue").style("opacity", 1)
                }
            });
/////////////////////BOTONES DE EDICIÓN/////////////

var bloqueBotones = d3.select("#grid")
    .data(gridData)
    .append("svg")
    .attr("width", "50px")
    .attr("height", "780px")
    .attr("x", "200px")
    .attr("y", "0px");
    bloqueBotones.append("image")
            .attr("x", 5)
            .attr("y", 5)
            .attr("width", 40)  
            .attr("height", 40)
            .attr('xlink:href', "img/borrarInactive.png")
            .on("click", function(d){
                clickborr = clickborr == false ? true : false;
                console.log(clickborr);
                if(clickborr == false){
                    d3.select(this).attr('xlink:href', "img/borrarInactive.png")
                }else{
                    d3.select(this).attr('xlink:href', "img/borrar.png")
                }
    });

///////////////FUNCTIONS/////////////////////////

function gridGenerator(){    
    var data = new Array();    var xpos = 1;    var ypos = 0;    var width = 96;    var height = 96;    var click = 0;    var img = "";
    //recorrido por filas
    for (var row = 0; row < 8; row++){
        data.push( new Array() );
        //recorrido por columnas
        for(var column = 0; column < 8; column++){
            var n = (Math.floor(Math.random()*10)+1);
            if(n<=7){
                img = "img/terreno01.png";
            }if(n==8 || n==9){
                img = "img/terreno03.png";
            }if(n==10){
                img = "img/terreno02.png";
            }
            data[row].push({x: xpos, y: ypos, width: width, height: height, idX: row, idY: column, click: click, img: img })
            //incrementa la variable x con el ancho de la casilla
            xpos += width;
        }
        //reestablece la posición del eje x al saltar a la sigueinte fila.
        xpos = 1;
        //incrementa la posición y por el ancho de fila.
        ypos += height;
    }
    return data;
}

function gridUnitsGenerator(player){
    var data = new Array();     var cont = 0;    var xpos = 1;    var ypos = 100;    var width = 96;    var height = 96;    var click = 0;
    var imgRed = ["img/infanteria01red.png", "img/infanteria02red.png", "img/mecanizada01red.png", "img/mecanizada02red.png", "img/BaseRed.png"];
    var imgBlue = ["img/infanteria01blue.png", "img/infanteria02blue.png", "img/mecanizada01blue.png", "img/mecanizada02blue.png", "img/BaseBlue.png"];
    for (var row = 0; row < 3; row++){
        data.push( new Array() );
        //recorrido por columnas
        for(var column = 0; column < 2; column++){
            if(player == 1){var img = imgRed[cont]; cont++; }else{ img = imgBlue[cont]; cont++;}
            if(row == 1){var type = "mec"; click = 2;}if(row==0){type = "inf"; click=3}
            if(row <2){
                data[row].push({ x: xpos, y: ypos, width: width, height: height, idX: row, idY: column, click: click, img: img, type: type, state: true})
            }if(row == 2 && column ==0){
                    data[row].push({x: xpos,y: ypos, width: width, height: height, idX: row, idY: column, click: 1, img: img, type: type, state: true })}
            //incrementa la variable x con el ancho de la casilla
            xpos += width;
        }
        //reestablece la posición del eje x al saltar a la sigueinte fila.
        xpos = 1;
        //incrementa la posición y por el ancho de fila.
        ypos += height;
    }
    return data;
}

function buttonGenerator(){
    var button = [{ "x": 20,"y": 20,"width": 250, "height": 50, "click": 0}]; return button;
}

