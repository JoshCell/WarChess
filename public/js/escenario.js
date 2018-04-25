window.onload=function(){
    var coordenadas = [0, 50, 100, 150, 200, 250, 300, 350];
    var board = new Array();
    for(var x = 0; x < 8; x++){
        for(var y = 0; y<8; y++){
            board[x][y] = new Array(coordenadas[x],coordenadas[y],0);
        }
    }
}