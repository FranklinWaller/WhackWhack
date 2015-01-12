(function(global){

    var gameField = document.getElementById('game');
    //var hitSound = new Media('sound/hit.wav');

    var whack = {
        score: 0,
        lastMole: -1,

        updateScore: function(){
            var scoreBoard = document.getElementsByClassName('score')[0];
            scoreBoard.innerHTML = whack.score;
        },

        generateMap: function(rowsX, rowsY){
            for(var i = 0; i < rowsX; i++){
                var row = '<div class="row">';

                for(var j = 0; j < rowsY; j++){
                    //row += '<div class="cell"><img src="./img/mole-grass-01.svg" class="mole"></div>';
                    row += '<div class="cell"><img src="./img/png/grass.png" class="mole"></div>';
                }

                row += '</div>';
                gameField.innerHTML += row;
            }
        },

        listenForWhack: function(scorePerMole, clickEventType){
            var cells = document.getElementsByClassName('mole');

            function eventClicked(e){
                var mole = e.srcElement;

                if (mole.classList.contains('isUp')) {
                    whack.score++;
                    //hitSound.play();

                    mole.className = 'mole';
                    //mole.src = './img/grass-01.svg';
                    mole.src = './img/png/grass.png';
                    mole.className += ' isClicked';
                    whack.updateScore();
                }else{
                    whack.showGameOverMenu();
                }
            }

            for (var i = cells.length - 1; i >= 0; i--) {
                cells[i].parentNode.addEventListener(clickEventType, eventClicked, false);
            };
        },

        startMoleTimer: function(moleUpTime, moleDownTime){
            var cells = document.getElementsByClassName('mole');
            var originalMoleUpTime = moleUpTime;
            var originalMoleDownTime = moleDownTime;
            
            var interval = function(){
                var randomMole;

                moleUpTime = originalMoleUpTime - (whack.score * 7);
                moleDownTime = originalMoleDownTime - (whack.score * 7);
               
                do{
                    randomMole = whack.getRandomNumber(0, cells.length);
                }
                while(randomMole === whack.lastMole);

                var mole = cells[randomMole];
                whack.lastMole = randomMole;

                mole.className += ' isUp';
                //mole.src = './img/mole-grass-01.svg';
                mole.src = './img/png/mole.png';

                setTimeout(function(){
                    
                    if(!mole.classList.contains('isClicked')){
                        whack.showGameOverMenu();
                    }

                    mole.className = 'mole';
                    //mole.src = './img/grass-01.svg';
                    mole.src = './img/png/grass.png';

                }, moleDownTime);

                clearInterval(intervalId);
                intervalId = setInterval(interval, moleUpTime);
            };

            
            var intervalId = setInterval(interval, moleUpTime);
            
        },

        showGameOverMenu: function(){
            var highScore = localStorage.getItem('highscore');

            if(highScore === null){
                localStorage.setItem('highscore', whack.score);
                highScore = whack.score;
            }else{
                if(highScore < whack.score){
                    localStorage.setItem('highscore', whack.score);
                    highScore = whack.score;
                }
            }

            var currentScoreElement = document.getElementsByClassName('current-score')[0];
            var highScoreElement = document.getElementsByClassName('high-score')[0];
            var gameOverScreen = document.getElementsByClassName('gameover')[0];

            currentScoreElement.innerHTML = whack.score;
            highScoreElement.innerHTML = highScore;

            gameOverScreen.style.display = 'block';
        },

        getRandomNumber: function(min, max){
            return Math.floor(Math.random() * max) + min;
        }


    };


    global.whack = whack;    
    

}(this));