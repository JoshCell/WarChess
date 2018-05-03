$(function(){
    function buildMap(gridSize){
        var map = { grid:[] };
        for(var i = 0; i<gridSize.x;i++){
            map.grid[i] = [];
            for(var j = 0; j<gridSize.y; j++){
                var url = "";
                var type = "";
                var tipoTer = Math.floor(Math.random() * 3) +1 ;
                if(tipoTer == 1){
                    type = "campo";
                    url = "public/img/terreno01.png";
                }if(tipoTer == 2){
                    type = "montaña";
                    url = "public/img/terreno02.png";
                }if(tipoTer == 3){
                    type = "bosque";
                    url = "public/img/terreno03.png";
                }
                var cell = {i:i, j:j, type:tipoTer, url:url}
                map.grid[i][j] = cell;
                map[type].push(cell);
            }
        }
        return map;
    }

    function getSvgSize(gridSize, square){
        var width = gridSize.x * square;
        var height = gridsize.y * square;
        return {width:width, height:height};
    }
    
    function getScale(gridSize, svgSize){
        var xScale = d3.scale.linear().domain([0,gridSize.x]).range([0,svgSize.width]);
        var yScale = d3.scale.linear().domain([0,gridSize.y]).range([0,svgSize.height]);
        return {x:xScale, y:yScale};
    }
    
    function drawCells(svgContainer, scales, svgSize, data){
        var gridGroup = svgContainer.append("g");
        var cells = gridGroup.selectAll("rect")
                                .data(data)
                                .enter()
                                .append("rect");
        var cellAttributes = cells      
                            .attr("x", function(d){ return scales.x(d.x);})
                            .attr("y", function(d){ return scales.y(d.y);})
                            .attr("width", function (d) { return square;})
                            .attr("height", function (d) { return square;})
    }
    
    

    var square = 50; //medida de cada casilla
    // var radius = 15 // ¿?
    var gridSize = { x:8, y:8 }; //Tamaño del tablero en cantidad de casillas
    var svgSize = getSvgSize(gridSize, square);
    var map = buildMap(gridSize); // llamada a función para construir el tablero.
    
    var svgContainer = d3.select(".display")
                                .append("svg")
                                .attr("width", svgSize.width)
                                .attr("height", svgSize.height);
    
    var scales = getScale(gridSize, svgSize);
    
    drawCells(svgContainer, scales, svgSize, map.campo);
});

