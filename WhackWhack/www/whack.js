(function(global){

    var gameField = document.getElementById('game');

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
                    row += '<div class="cell">Mole</div>';
                }

                row += '</div>';
                gameField.innerHTML += row;
            }
        },

        listenForWhack: function(scorePerMole, clickEventType){
            var cells = document.getElementsByClassName('cell');

            function eventClicked(e){

                var mole = e.srcElement;

                if (mole.classList.contains('isUp')) {
                    whack.score++;
                    mole.className = 'cell';
                    mole.style.color = 'black';
                    mole.className += ' isClicked';
                    whack.updateScore();
                }else{
                    whack.showGameOverMenu();
                }           
            }

            for (var i = cells.length - 1; i >= 0; i--) {
                cells[i].addEventListener(clickEventType, eventClicked, false);
            };
        },

        startMoleTimer: function(moleUpTime, moleDownTime){
            var cells = document.getElementsByClassName('cell');
            var originalMoleUpTime = moleUpTime;
            var originalMoleDownTime = moleDownTime;
            
            var interval = function(){
                var randomMole;

                moleUpTime = originalMoleUpTime - whack.score;
                moleDownTime = originalMoleDownTime - whack.score;
               
                do{
                    randomMole = whack.getRandomNumber(0, cells.length);
                }
                while(randomMole === whack.lastMole);

                var mole = cells[randomMole];
                whack.lastMole = randomMole;

                console.log(moleUpTime + ' and ' + moleDownTime);

                mole.style.color = "white";
                mole.className += ' isUp';

                setTimeout(function(){
                    mole.style.color = "black";
                    
                    if(!mole.classList.contains('isClicked')){
                        whack.showGameOverMenu();
                    }

                    mole.className = 'cell';
                    
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