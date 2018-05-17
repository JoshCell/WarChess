//////////////////////////CLIENTE///////////////////////////////
var socket = io.connect('http/localhost/ProyectoWarchess');
var nombreJugador = "";
var puntos;
var unidades;

socket.on("jugador", function(nombre,pts,uni){
    nombreJugador = nombre;
    puntos = pts;
    unidades = uni;
    var menu = d3.select("#menu")
        .append("svg")
        .attr("class", "menuJugador")
        .attr("width", "290px")
        .attr("height", "1500px")
        .attr("x", "10px")
        .attr("y", "15px");
    menu.append("image")
        .attr("class", "ready")
        .attr("width", 250)
        .attr("height", 50)
        .attr("x", 5)
        .attr("y", 5)
        .attr('xlink:href',"img/buttonStartRed.png")
        .on("click", function(d){
           // if(unitsLeft==0){
                ButStartBol = true; 
                d3.select(this).attr('xlink:href',"img/buttonStartGreen.png")
            //d3.select(".stsPTextRed").style("opacity", 1)
            //d3.select(".stsPTextBlue").style("opacity", 1)
        });
    
});
          
         /* var ButStartBol = false;
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
    

/*var unitsMenu = menu.selectAll(".unitsMenu")
            .data(gridUnitsData)
            .enter().append("g")
            .attr("class", "row");

var units = unitsMenu.selectAll(".units")
            .data(function(d) { return d; })
            .enter().append("g")
            .attr("class","units");


/*var imageUnits = units.append("image")
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
});