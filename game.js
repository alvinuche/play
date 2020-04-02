
var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $('#level-title').text('level ' + level);
        nextSequence()
        started = true;
    }
})



function nextSequence() {
    userClickedPattern = [];
    level++;

    $('#level-title').text('level ' + level)

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor);
    
    
    $('#'+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
    
    
}


$('.btn').click(function(){
     var userChosenColor = $(this).attr('id');
     userClickedPattern.push(userChosenColor);
     animatePress(userChosenColor);
     playSound(userChosenColor);
     
     checkAnswer(userClickedPattern.length - 1)
});

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $('.btn').click(function(){
        $(this).addClass('pressed');
        setTimeout(() => {
            $(this).removeClass('pressed');
        }, 100);
    });
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else{
        $('h1').text('Game Over, Press Any Key to Restart')
        $('body').addClass('game-over')
        setInterval(() => {
            $('body').removeClass('game-over')
        }, 200);
        playSound('wrong');

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}





