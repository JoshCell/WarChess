function gridGenerator(){
    var data = new Array();
    var xpos = 300;
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
        xpos = 300;
        //incrementa la posición y por el ancho de fila.
        ypos += height;
    }
    return data;
}

var gridData = gridGenerator();
//monitorización por consola del gridData para debug
//console.log(gridData);

var grid = d3.select("#grid")
            .append("svg")
            //.attr('xlink:href', "public/img/Cuadricula.svg")
            //.attr("viewBox", "-300,0,1500, 1500")
            .attr("width", "1500px")
            .attr("height", "1500px");

var row = grid.selectAll(".row")
            .data(gridData)
            .enter().append("g")
            .attr("class", "row");

var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("image")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
    .attr('xlink:href',"public/img/terreno01.png")
	//.style("fill", "#fff")
	//.style("stroke", "#222")
	.on('click', function(d) {
       d.click++;
       if ((d.click)%3 == 0 ) { d3.select(this).attr('xlink:href',"public/img/terreno01.png"); }
	   if ((d.click)%3 == 1 ) { d3.select(this).attr('xlink:href',"public/img/terreno02.png"); }
	   if ((d.click)%3 == 2 ) { d3.select(this).attr('xlink:href',"public/img/terreno03.png"); }
    });