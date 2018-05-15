

////////////////FUNCTIONS/////////////////////////

function gridGenerator(){
    var data = new Array();
    var xpos = 1;
    var ypos = 0;
    var width = 96;
    var height = 96;
    var click = 0;
    var img = "";
    //recorrido por filas
    for (var row = 0; row < 8; row++){
        data.push( new Array() );
        //recorrido por columnas
        for(var column = 0; column < 8; column++){
            var n = (Math.floor(Math.random()*10)+1);
            if(n<=7){
                img = "public/img/terreno01.png";
            }if(n==8 || n==9){
                img = "public/img/terreno03.png";
            }if(n==10){
                img = "public/img/terreno02.png";
            }
            data[row].push({
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                idX: row,
                idY: column,
                click: click,
                img: img
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

function gridUnitsGenerator(player){
    var data = new Array();
    var cont = 0;
    var xpos = 1;
    var ypos = 0;
    var width = 96;
    var height = 96;
    var click = 0;
    var imgRed = ["public/img/infanteria01red.png", "public/img/infanteria02red.png", "public/img/mecanizada01red.png", "public/img/mecanizada02red.png"];
    var imgBlue = ["public/img/infanteria01blue.png", "public/img/infanteria02blue.png", "public/img/mecanizada01blue.png", "public/img/mecanizada02blue.png"];
    for (var row = 0; row < 2; row++){
        data.push( new Array() );
        //recorrido por columnas
        for(var column = 0; column < 2; column++){
            if(player == 1){var img = imgRed[cont]; cont++; }else{ img = imgBlue[cont]; cont++;}
            if(row == 1){var type = "mec"; click = 2;}if(row==0){type = "inf"; click=4}
            data[row].push({
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                idX: row,
                idY: column,
                click: click,
                img: img,
                type: type,
                state: true
            })
            //incrementa la variable x con el ancho de la casilla
            xpos += width;
        }
        //reestablece la posición del eje x al saltar a la sigueinte fila.
        xpos = 1;
        //incrementa la posición y por el ancho de fila.
        ypos += height;
    }
    /*if(player == 1){
        img = "public/img/BaseRed.png";
    }else{
        img = "public/img/BaseBlue.png";
    }
    data[2].push({
        x: xpos,
        y: ypos,
        width: width,
        height: height,
        idX: row,
        idY: column,
        click: click,
        img: img,
        type: "base",
        state: false
    })*/
    
    return data;
}



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
        .on('click', function(d){
            d.click++;
           if(state == true && tics>0){
                d3.select(this).attr('xlink:href', imagen);
                tics--;
                if(tics<1){
                    thisNode.attr("opacity", 0);
                    d.state = false;
                }
            }
            /*if(inf1Bool==true && inf1Cont>0){
                //console.log(unidadesRed.length);
                d3.select(this).attr('xlink:href',"public/img/infanteria01red.png").attr("id", inf1Cont + "red");
                inf1Cont--;
                if(inf1Cont == 0){
                    infMenu.attr("opacity", 0);
                }
            }
            if(mec1Bool==true && mec1Cont>0){
                //console.log(unidadesRed.length);
                d3.select(this).attr('xlink:href',"public/img/mecanizada01red.png").attr("id", mec1Cont + "red");
                mec1Cont--;
                if(mec1Cont == 0){
                    mecMenu.attr("opacity", 0);
                }
            }
            /*if(clickborr == true){
                d3.select(this).attr('xlink:href', "");
            }*/
        });

//////////////////UNIDADES MENU (CLICK Y COLOCAR)/////////////////////
var player = 1; // variable de jugador. 1 es jugador Rojo, 2 es jugador Azul
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

      var state;
      var imagen = "";
      var tics = 0; 
    var thisNode;
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
//                if(mec1Cont != 0){mecMenu.attr("opacity", 1)};
            });

/*var menuUnidades = d3.select("#menu")
            .append("svg")
            .attr("width", "290px")
            .attr("height", "1500px")
            .attr("x", "10px")
            .attr("y", "15px");
        var inf1Bool;
        var mec1Bool;
        var inf1Cont = 4;
        var mec1Cont = 2;
        var infMenu = menuUnidades.append("image")
            .attr("x", 1)
            .attr("y", 51)
            .attr("width", 96)
            .attr("height", 96)
            .attr("opacity", 1)
            .attr('xlink:href',"public/img/infanteria01red.png")
            //.classed('draggable', true);
            .on('click', function(d){
                inf1Bool = true
                mec1Bool = false   
                console.log(mec1Bool)
                console.log(inf1Bool)
                d3.select(this).attr("opacity", 0.3)
                if(mec1Cont != 0){mecMenu.attr("opacity", 1)};
            });
        
        var mecMenu = menuUnidades.append("image")
            .attr("x", 100)
            .attr("y", 51)
            .attr("width", 96)
            .attr("height", 96)
            .attr("opacity", 1)
            .attr('xlink:href',"public/img/mecanizada01red.png")
            //.classed('draggable', true);
            .on('click', function(d){
                inf1Bool = false
                mec1Bool = true
                console.log(mec1Bool)
                console.log(inf1Bool)
                menuUnidades.attr("opacity", 1)
                d3.select(this).attr("opacity", 0.3)
                if(inf1Cont != 0){infMenu.attr("opacity", 1)};
                
            });
*/