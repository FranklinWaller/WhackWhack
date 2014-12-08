(function(global, whack){

    whack.generateMap(4,4);
    whack.listenForWhack(1, 'click');
    whack.startMoleTimer(1000,1000);

}(this, whack));