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

/*d3.selection.prototype.moveToFront = function(){
    return this.each(function(){
        this.parentnOde.appendChild(this);
    });
};

d3.selection.prototype.moveToBack = function(){
  return this.each(function(){
      var firstChild = this.parentNode.firstChild;
      if (firstChild){
          this.parentNode.insertBefore(this, firstChild);
      }
  });  
};*/

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
        .attr('xlink:href',"public/img/terreno01.png")
        //.style("fill", "#fff")
        //.style("stroke", "#222")
        .on('click', function(d) {
            //squareUnit.remove();
            d.click++;
            if(clickUni==false){
                if ((d.click)%3 == 0 ) { d3.select(this).attr('xlink:href',"public/img/terreno01.png"); }
                if ((d.click)%3 == 1 ) { d3.select(this).attr('xlink:href',"public/img/terreno02.png"); }
                if ((d.click)%3 == 2 ) { d3.select(this).attr('xlink:href',"public/img/terreno03.png"); }

            }
        });
    var idCont = 0
    var squareUnit = column.append("image")
        .attr("x", function(d) { return d.x + 15; })
        .attr("y", function(d) { return d.y + 15; })
        .attr("width", 75)
        .attr("height", 75)
        .on('click', function(d){
            d.click++;
            if(clickUni==true){
                
                if ((d.click)%2 == 0 ) { var imgRed = d3.select(this).attr('xlink:href',"public/img/infanteria01red.png").attr("id", idCont + "red"); unidadesRed.push(imgRed);}
                if ((d.click)%2 == 1 ) { d3.select(this).attr('xlink:href',"public/img/infanteria01blue.png").attr("id", idCont + "blue");} 
                idCont++;
            }
            if(clickborr == true){
                d3.select(this).attr('xlink:href', "");
            }
        });
    
    /*var gridGuide = d3.select("#grid")
                .append("svg").append("image")
                .attr("x", 290)
                .attr("y", 10)
                .attr("width", 768)
                .attr("height", 768)
                .attr('xlink:href',"public/img/Cuadricula.svg");*/
    
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






