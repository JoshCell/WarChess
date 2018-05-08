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
    .attr("class","square");
    
            
    column.append("image")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
    .attr('xlink:href',"public/img/terreno01.png")
	//.style("fill", "#fff")
	//.style("stroke", "#222")
	.on('click', function(d) {
        squareUnit.remove();
        d.click++;
        if(clickUni==false){
            if ((d.click)%3 == 0 ) { d3.select(this).attr('xlink:href',"public/img/terreno01.png"); }
	        if ((d.click)%3 == 1 ) { d3.select(this).attr('xlink:href',"public/img/terreno02.png"); }
            if ((d.click)%3 == 2 ) { d3.select(this).attr('xlink:href',"public/img/terreno03.png"); }
            
        }
    });

    var squareUnit = column.append("image")
    .attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
    .on('click', function(d){
        d.click++;
        if(clickUni==true){
            if ((d.click)%2 == 0 ) { d3.select(this).attr('xlink:href',"public/img/infanteria01red.png"); }
	        if ((d.click)%2 == 1 ) { d3.select(this).attr('xlink:href',"public/img/infanteria01blue.png"); }
        }
    })
    
    /*column.append("image")
    .attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
    .on("click", function(d){
        if ((d.click)%2 == 0 ) { d3.select(this).append("image")
                    .attr("x", function(d) { return d.x; })
	                .attr("y", function(d) { return d.y; })
                    .attr("width", function(d) { return d.width; })
                    .attr("height", function(d) { return d.height; }).attr('xlink:href',"public/img/infanteria01red.png"); 
            }
	        if ((d.click)%2 == 1 ) { d3.select(this).append("image")
                    .attr("x", function(d) { return d.x; })
	                .attr("y", function(d) { return d.y; })
                    .attr("width", function(d) { return d.width; })
                    .attr("height", function(d) { return d.height; })
                    .attr('xlink:href',"public/img/infanteria01blue.png"); };
    });*/



/////////////////////INCLUSIÓN DE UNIDADES/////////////////////////////////////////////////

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
        .attr("width", 20)
        .attr("height", 20)
        .attr('xlink:href', "public/img/IconoUnidades.png")
        .on("click", function(d){
            clickUni = clickUni == false ? true : false;
            if(clickUni == true){
                d3.select(this).attr('xlink:href',"public/img/IconoTerreno.png")
            }else{
                d3.select(this).attr('xlink:href',"public/img/IconoUnidades.png")
            }
            console.log(clickUni);
        });