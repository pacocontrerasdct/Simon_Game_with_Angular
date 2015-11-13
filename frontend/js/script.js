$(document).ready(function(){
  console.log('Ready!!!');
  setUp();
});

function setUp() {
  console.log('Hi setUp');
  
  // Message to the blind about the playing screen
  hello();
  
  // Variables to play a new game
  var computerPattern = [];
  var computer = [];
  var startTime;
  var level = 0;
  var delay = 0;
  // This is a prefix name for choosing level sound file:
  var levelPref = 'sound_for_level_';
  var score = 0;
  // This is a prefix name for choosing length: s = 250ms; m = 500ms; l = 1000ms
  var soundPref = 'sound_s_';
  // This is the speed of the computer pattern (can be change to adjust complexity)
  var speedness = 1000;

  function resetVariables() {
    // Variables to play a new game
    var computerPattern = [];
    var computer = [];
    var startTime;
    var level = 0;
    var score = 0;
  }

      // To present different messages to Player use a switch comparation
      var messageToPlayer;
      
      function message(messageToPlayer){
        switch (messageToPlayer) {
          case "gameOver":
            console.log('inside message')
            $('#instruction-msg').html('<h1 class="animated zoomOut">GAME OVER</h1>');
            resetVariables();
          default:
            $('h1').remove();
        }
      }

  $('#startButton').on('click', newPattern);
  $('#quitButton').on('click', showBlinking);

  function hello(){   
    var sound = $('.speech_description_play_page')[0];
    sound.currentTime = 0;
    sound.play();
    sound = '';
    setTimeout(function(){
    sound = $('.speech_how_sound_squares_1')[0];
    sound.currentTime = 0;
    sound.play();
    sound = '';
    }, 2000);
    setTimeout(function(){
    sound = $('.speech_how_sound_squares_2')[0];
    sound.currentTime = 0;
    sound.play();
    sound = '';
    }, 2000);
  }

  // For showing the pattern to newbee or a blind person
  function showBlinking(){

    var instructions = [
      'sound1_top_left_squ',
      'sound2_top_right_squ',
      'sound3_bottom_left_squ',
      'sound4_bottom_right_squ',
      'Now I\'m going to show you the different sounds that every square in the game does when blinks',
      'Keep in mind that repeating that sounds in the same order is going to allow you to pass to the next level in the game'
    ];

    $.each([1,2,3,4,5], function(index, element){      
      time = index * speedness;
      setTimeout(function(){
        console.log('square id: ', element);
        if(element != 5) {
          var sound = $('.'+ instructions[index] )[0];
          sound.currentTime = 0;
          sound.play();
          sound = '';
          blink(element, delay);
        }
      }, time + delay);
    });
  };

  // Countdown to start the game
  function countDown(){ 
    $.each([3,2,1,""], function (index, element){
      setTimeout(function(){
        $('#instruction-msg').html('<h1 class="animated zoomIn">'+ element +'</h1>');
      }, (index+1) * 1000);
    });
    $('h1').remove();
  }


  // Function to create pattern for the game
  function newPattern() {  
    for(i = 0; i < level + 1; i++ ){
      // Getting a number between 1-4
      number = Math.floor(Math.random() * 4) + 1;
      // Recording into our computer pattern array
      computerPattern.push(number);
    }
    console.log('Next is the pattern:', computerPattern);
    
    // Using 'computer' as a temporary container
    computer = computerPattern;
    console.log('In newPattern, this is the computer:', computer);
    console.log('In newPattern, this is the computerPattern:', computerPattern);

    // Using a loop for getting the DIVs with ids: #sqr1, #sqr2..
    // Then, 'blink' to make colors change on the board 
    $.each(computerPattern, function(index, element){
        time = index * speedness;
        console.log("This time: ",time);
        setTimeout(function(){
          blink(element, delay);
        }, time);
    });

    // Getting starting time of this game
    if(level == 0) {
      startTime = $.now(); 
      console.log('This game starts at: ', startTime);
    }
    
    addListeners();
  }

  function blink(element, delay){
    // Getting window element, toggling class to make it enlightened
    $('#sqr'+element+'.div'+element).toggleClass('div'+element+'light');
    
    // // Playing sound associated to that element 
    // var sound = $('.' + soundPref + element)[0];
    // sound.currentTime = 0;
    // sound.play();
    
    setTimeout(function(){
      // Playing sound associated to that element 
      var sound = $('.' + soundPref + element)[0];
      sound.currentTime = 0;
      sound.play();
      var sound = '';
    }, delay);


    // Calling toggleClass again to 'switch off' square, and clear var 'sound'
    setTimeout(function(){
      $('#sqr'+element+'.div'+element).toggleClass('div'+element+'light');
      var sound = '';
    }, 600 + delay);
  };

  // On player turn put listeners to check if his/her pattern match computer one
  function addListeners() {
    $.each([1,2,3,4], function(index, element){
      $('#sqr' + element).on('click', function() {
        blink(element);
        checkPattern(element);
      })
      console.log('adding', element)
    });
  }

  // On computer turn remove listeners
  function removeListeners() {
    $.each([1,2,3,4], function(index, element){
      $('#sqr' + element).off();
    });
  }

  // Checking player vs computer patterns
  function checkPattern(element){
    var playerSelection = element;
    console.log('This player Selection: ', playerSelection);
    // Lets say that computer did 3 numbers, computerPattern = [2,3,2]
    // Need to check every click against computerPattern
    // First click let say player click = 2, checking computer[0] position
    // and match so, remove first computer value. Now computer is [3,2]
    // Second click player = 3, checking computer[0] position
    // and match so remove that value, Now computer is [2]
    // Third, player = 2, computer is 2, so remove that value
    // No more values, no error, then player goes to next level
    
    console.log('before comparing with player computer is: ', computer);
    console.log('before comparing with player computerPattern is : ', computerPattern);

    if(playerSelection == computer[0]){
      computer.splice(0, 1);
      if(computer.length === 0){
        console.log('Pass to next level')
        // There is no more values in the array, so player go to next level
        level = level + 1;
        $('#instruction-msg').html('<h1 class="animated zoomIn">LEVEL: ' +level+'</h1>');

        // Playing sound associated to that level 
        var sound = $('.' + levelPref + level)[0];
        sound.currentTime = 0;
        sound.play();
        sound = '';

        // add Score and Level To DB?
        // Continue Game next level
        removeListeners();
        setTimeout(function(){
          $('h1').remove();
          newPattern();
        }, 2000);
      } else {
        console.log('Right, there are more numbers')
      }
    } else {  // If player makes a mistake  
      console.log('player fails');
      finishTime = $.now(); 
      console.log('This game finishes at: ', finishTime);
      // I have to clean 'computerPattern'
      // debugger;
      gameOver();
    }
    console.log('end of compare function computer is: ', computer);
    console.log('end of compare function computerPattern is : ', computerPattern);

  }

  function gameOver(){
    console.log('Game Over');
    removeListeners();
    computerPattern = [];
    computer = [];
    startTime;
    level = 0;
    score = 0;
    $('#instruction-msg').html('<h1 class="animated zoomIn">GAME OVER</h1>');
    setTimeout(function(){
      message('gameOver');
    }, 3000);
    var sound = $('.game-over')[0];
    sound.currentTime = 0;
    sound.play();
    sound = '';
  }

  // This function close the window and finishes the game
  function quit(){
    console.log('function quit disabled!')
    // url = "https://www.google.co.uk/";
    // var newWindow = window.open('', '_self', ''); //open the current window
    // window.close(url);
  };

// End of setUp
}




















