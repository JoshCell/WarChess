//////////////////MENÚ LATERAL//////////////////////////////// 

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
//console.log(menuData);

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
                console.log(ButStaBol);
                d3.select(this).attr('xlink:href',"public/img/buttonStatsGreen.png")})
            .on("mouseup", function(d){
               ButStaBol = false; 
                console.log(ButStaBol);
                d3.select(this).attr('xlink:href',"public/img/buttonStatsRed.png")});

///////////////////////////////VENTANA STATS//////////////////////////////
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
 //  if(ButStaBol == true){
        rectStatsWindow.append("text")
            .data(statsPartida)
            .attr("class", "stsPText")
            //.attr("width", "100px")
            //.attr("height", "100px")
            //.attr("x", "5px")
            //.attr("y", "5px")
            .style("font-size", "10")
            .style("fill", "red")
            //.on("mousedown", function(d){
            //d3.select(this).text("Equipo Rojo: " + "RedTeam", function(d) { return d.RedTeam;});
            .text("Equipo Rojo: ");
        //});
            
    //}
    /*var buttonRectStats = buttonStats.append("rect")
            .attr("class", "buttonStatsRect")
            .attr("x", function(d) { return d.x;})
            .attr("y", function(d) { return d.y;})
            .attr("width", function(d) { return d.width;})
            .attr("height", function(d) { return d.height;})
            .style("fill", "red")
            .style("stroke", "#222")
            .on("mousedown", function(d){
                d3.select(this).style("fill", "green")
            })
            .on("mouseup", function(d){
                d3.select(this).style("fill", "red")
            });
            
            .on("click", function(d){
            d.click++;
            if((d.click)%2==1){
               var windowStats = menu.select(".windowStats")
                    .enter().append("text")
                    .attr("x", "50px")
                    .attr("y", "400px")
                    .style("font-size", "35")
                    .style("fill", "red");
              }else{
                  windowStats.close();
              }
    });

    buttonRectStats.append("text")
            .text("STATS PARTIDA")
            .style("fill", "blue")
            .style("font-size", "25");
            //.attr("x", "5px")
            //.attr("y", "5px");/*

//////////////////////////VENTANA STATS/////////////////////

//var stats = d3.select("#menu").select("svg");


/*
var but = stats.selectAll(".buttons")
    .data(function(d){ return d; })
    .enter().append("rect")
    .attr("class", "buttons")
    .attr("x", function(d) { return d.x;})
    .attr("y", function(d) { return d.y;})
    .attr("width", function(d) { return d.width;})
    .attr("height", function(d) { return d.height;})
    .style("fill", "red")
    .style("stroke", "#222");





/*
var stats = menu.select(".statsmenu")
            .enter.append("rect")
            .attr("class", "statsmenu")
            .attr("x", "0px")
            .attr("y", "0px")
            .attr("width", "150px")
            .attr("height", "50px")
            .style("fill", "red")
            .style("stroke", "#222")


///////////////////////////VENTANA DE STATS//////////////////////////

/*var stats = grid.selectAll(".stats")
            .data(function(d){ return d; })
            .enter().append("rect")
            .attr("class", "stats")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 100)
            .attr("height", 200)
            .style("background", "#0066ff")
//            .style("visibility", "hidden")
            .text("STATS")*/

            /*d3.select("body")
            .selectAll(".stats")
            .enter().append(".stats")
                .style("width", function(d){return d+"px";})
                .style("height", function(d){return d+"px";})
                .text(function(d){return d;})
                .on("mouseover", function(d){stats.text(d);return stats.style("visibility", "visible");})
                .on("mouseout", function(){return stats.style("visibility","hidden");
                });*/