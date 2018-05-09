var unidadesRed = [];
var unidadesBlue = [];

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////GRID/ESCENARIO///////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

function gridGenerator(){
    var data = new Array();
    var xpos = 1;
    var ypos = 0;
    var width = 96;
    var height = 96;
    var click = 0;
    //recorrido por filas
    for (var row = 0; row < 8; row++){
        data.push( new Array() );
        //recorrido por columnas
        for(var column = 0; column < 8; column++){
            data[row].push({
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                id: row + "-" + column,
                click: click
            })
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



var gridData = gridGenerator(); //función de generación de tablero/grid
//monitorización por consola del gridData para debug
console.log(gridData);

/////////////////CREAMOS EL SVG DONDE SE CREA TODO EL JUEGO/////////////

var grid = d3.select("#grid")
            .append("svg")
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
        .attr('xlink:href',"public/img/terreno01.png")
        .on('click', function(d) {
            d.click++;
            if(clickUni==false){
                if ((d.click)%3 == 0 ) { d3.select(this).attr('xlink:href',"public/img/terreno01.png"); }
                if ((d.click)%3 == 1 ) { d3.select(this).attr('xlink:href',"public/img/terreno02.png"); }
                if ((d.click)%3 == 2 ) { d3.select(this).attr('xlink:href',"public/img/terreno03.png"); }

            }
        });
        /*.on('mouseover', function(d){
                d3.select(this).attr('xlink:href', "public/img/selectZone.svg");
        });*/
    var idCont = 0
    var squareUnit = column.append("image")
        .attr("x", function(d) { return d.x + 15; })
        .attr("y", function(d) { return d.y + 15; })
        .attr("width", 75)
        .attr("height", 75)
        .on('click', function(d){
            d.click++;
            if(clickUni==true){
                console.log(unidadesRed.length);
                if ((d.click)%2 == 0 ) { var imgRed = d3.select(this).attr('xlink:href',"public/img/infanteria01red.png").attr("id", idCont + "red"); unidadesRed.push(imgRed);}
                if ((d.click)%2 == 1 ) { d3.select(this).attr('xlink:href',"public/img/infanteria01blue.png").attr("id", idCont + "blue");} 
                idCont++;
            }
            if(clickborr == true){
                d3.select(this).attr('xlink:href', "");
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
    var clickUni = false;
    bloqueBotones.append("image")
        .attr("x", 5)
        .attr("y", 10)
        .attr("width", 40)
        .attr("height", 40)
        .attr('xlink:href', "public/img/IconoUnidades.png")
        .on("click", function(d){
            clickUni = clickUni == false ? true : false;
            if(clickUni == true){
                d3.select(this).attr('xlink:href',"public/img/IconoTerreno.png");
            }else{  d3.select(this).attr('xlink:href',"public/img/IconoUnidades.png");
            }
            console.log(clickUni);
        });
    var clickborr = false;
    bloqueBotones.append("image")
            .attr("x", 5)
            .attr("y", 55)
            .attr("width", 40)  
            .attr("height", 40)
            .attr('xlink:href', "public/img/borrarInactive.png")
            .on("click", function(d){
                clickborr = clickborr == false ? true : false;
                if(clickborr == false){
                    d3.select(this).attr('xlink:href', "public/img/borrarInactive.png")
                }else{
                    d3.select(this).attr('xlink:href', "public/img/borrar.png")
                }
    });






///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////////////MENU STATS/////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


function buttonGenerator(){
    var button = [{ "x": 20,"y": 20,"width": 250, "height": 50, "click": 0}]; return button;
}
function statsWindowGenerator(){
    var stswin = [{ "x": 20,"y": 75,"width": 250, "height": 200, "click": 0}]; return stswin;
}

function showStatsPartida(){
    var statsP = [{ "RedTeam:": 0, "BlueTeam": 0, "RedPoints": 0, "BluePoints": 0}]; return statsP;
}

var buttonData = buttonGenerator();
var statsWinData = statsWindowGenerator();
var statsPartida = showStatsPartida();


var menu = d3.select("#menu")
            .append("svg")
            .attr("width", "290px")
            .attr("height", "1500px")
            .attr("x", "10px")
            .attr("y", "15px");
            

//////////////////////////VENTANA BOTONES///////////////////////
var ButStaBol = false;
var buttonStats = menu.selectAll(".buttonStats")
            .data(buttonData)
            .enter().append("g")
            .attr("class", "buttonStats");
    var buttonImg = buttonStats.append("image")
            .attr("class", "buttonSt")
            .attr("width", function(d) { return d.width;})
            .attr("height", function(d) { return d.height;})
            .attr("x", function(d) { return d.x;})
            .attr("y", function(d) { return d.y;})
            .attr('xlink:href',"public/img/buttonStatsRed.png")
            .on("mousedown", function(d){
               ButStaBol = true; 
                d3.select(this).attr('xlink:href',"public/img/buttonStatsGreen.png")
                d3.select(".stsPTextRed").style("opacity", 1)
                d3.select(".stsPTextBlue").style("opacity", 1)
            })
                
            .on("mouseup", function(d){
               ButStaBol = false; 
                d3.select(this).attr('xlink:href',"public/img/buttonStatsRed.png");
                d3.select(".stsPTextRed").style("opacity", 0)
                d3.select(".stsPTextBlue").style("opacity", 0)
            });

///////////////////VENTANA STATS//////////////////
var statsWindow = menu.selectAll(".statsWindow")
    .data(statsWinData)
    .enter().append("g")
    .attr("class", "statsWindow");
    
    var rectStatsWindow = statsWindow.append("rect")
        .attr("class", "rectStatsWindow")
        .attr("x", function(d) { return d.x;})
        .attr("y", function(d) { return d.y;})
        .attr("width", function(d) { return d.width;})
        .attr("height", function(d) { return d.height;})
        .style("fill", "white")
        .style("stroke", "#222");
    var marcadorRojo = statsWindow.append("text")
        .data(statsPartida)
        .attr("class", "stsPTextRed")
        .attr("x", 25)
        .attr("y", 100)
        .style("font-size", "16")
        .style("fill", "red")
        .style("opacity", 0)
        .text("Equipo Rojo: " + unidadesRed.length);
        

    var marcadorAzul = statsWindow.append("text")
        .data(statsPartida)
        .attr("class", "stsPTextBlue")
        .attr("x", 25)
        .attr("y", 120)
        .style("font-size", "16")
        .style("fill", "blue")
        .style("opacity", 0)
        .text("Equipo Azul: " + unidadesBlue.length);

    
