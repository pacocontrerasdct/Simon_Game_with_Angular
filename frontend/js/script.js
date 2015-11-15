$(document).ready(function(){
  console.log('Ready!!!');
  setUp();
});

function setUp() {

  // Variables to play a new game
  var pattern = [];
  var startTime;
  var level = 0;
  var score = 0;
  var sound = '';
  var control = 0;
  
  // To present different messages to Player use a switch comparation
  var messageToPlayer;
  // This is a prefix name for choosing level sound file:
  var levelPref = 'sound_for_level_';
  // This is a prefix name for choosing length: s = 250ms; m = 500ms; l = 1000ms
  var soundPref = 'sound_s_';
  // This is the speed of the computer pattern (can be change to adjust complexity)
  var speedness = 1000;

  function resetVariables() {
    pattern = [];
    startTime;
    level = 0;
    score = 0;
    sound = '';
    control = 0;
  }

  function message(messageToPlayer){
    switch (messageToPlayer) {
      case "gameOver":
        console.log('inside message')
        $('#instruction-msg').html('<h1 class="animated zoomOut">GAME OVER</h1>');
        $('h1').remove();
        break;
      case "play-screen-description":
        sound = $('#speech_description_play_page')[0];
        sound.currentTime = 0;
        sound.play();
        sound = '';
        break;
      case "how-to-play":
        sound = $('#speech_description_how_to_play')[0];
        sound.currentTime = 0;
        sound.play();
        sound = '';
        break;
      case "stop-description":
        sound = $('#speech_description_play_page');
        sound[0].pause();
        sound[0].load();
        break;
      default:
        $('h1').remove();
        sound = $('#sounds')[0];
        sound.currentTime = 0;
        sound.stop();
        sound = '';
    }
  }

  // Description about the playing screen
  message("play-screen-description");

  $('#startButton').on('click', function() {
      // Stop description of the screen if it is playing
      message("stop-description");
      // Start Countdown
      countDown();
      // Present first pattern
      setTimeout(function(){
        $('h1').remove();
        newPattern();
      }, 4500);
  });
  $('#quitButton').on('click', showBlinking);

  // For showing the pattern to a new player
  function showBlinking(){
    
    // Stop description of the screen
    message("stop-description");
    // Play description how to play
    message("how-to-play");

    var instructions = ['Click on squares', 'To check how they works', 'Each one blinks', 'And have a different sound', ''];

    $.each([1,2,3,4,5], function(index, element){      
      time = index * speedness;
      setTimeout(function(){
        console.log('square id: ', element);
          $('#instruction-msg').html('<h1 class="animated slideInDown">'+ instructions[index] +'</h1>');
      }, time);
    });

    // Add listeners to try session
    $.each([1,2,3,4], function(index, element){
      $('#sqr' + element).on('click', function() {
        blink(element);
      })
      console.log('adding listener to how to, element ', element)
    });
    
    // Remove empty tag to avoid a non clickable area over squares
    setTimeout(function(){
      $('h1').remove();
    }, time);
  };

  // Countdown to start the game
  function countDown(){ 
    $.each([3,2,1,"GO",""], function (index, element){
      setTimeout(function(){
        $('#instruction-msg').html('<h1 class="animated zoomIn">'+ element +'</h1>');
      }, (index + 1) * 760);
    });
    sound = $('#sound_countdown')[0];
    sound.currentTime = 0;
    sound.play();
    sound = '';
  }

  // Function to create a pattern for the game
  function newPattern() {
    
    // Stop description of the screen
    message("stop-description");
    // Show scores
     $('#scores').toggleClass("ng-hide", false);

    // Getting a number between 1-4
    number = Math.floor(Math.random() * 4) + 1;
    // Recording that number into our computer pattern array
    pattern.push(number);

    // Using a loop for getting the DIVs with ids: #sqr1, #sqr2..
    // Then, 'blink' to make colors change on the board 
    $.each(pattern, function(index, element){
        time = index * speedness;
        console.log("This time: ",time);
        setTimeout(function(){
          blink(element);
        }, time);
    });

    // Getting starting time of this game
    if(level == 0) {
      startTime = $.now(); 
      console.log('This game starts at: ', startTime);
    }

    // Add listeners to track player answer with a delay to avoid interaction before needed
    setTimeout(function(){ 
      addListeners();
    }, time + 1000);
  }

  function blink(element){
    // Getting window element, toggling class to make it enlightened
    $('#sqr'+element+'.div'+element).toggleClass('div'+element+'light');
    
    setTimeout(function(){ // Playing sound associated to that element 
      sound = $('#' + soundPref + element)[0];
      sound.currentTime = 0;
      sound.play();
      sound = '';
    }, 0);

    // Calling toggleClass again to 'switch off' square, and clear var 'sound'
    setTimeout(function(){
      $('#sqr'+element+'.div'+element).toggleClass('div'+element+'light');
      sound = '';
    }, speedness * 0.75); // Need to adjust synchronisation with sound
  };

  // For adding listeners when needed 
  function addListeners() {
    $('.square').css({ 'cursor':'pointer' }); // Add 'pointer' style
    $.each([1,2,3,4], function(index, element){
      $('#sqr' + element).on('click', function() {
        blink(element); // When click it, blink and check pattern
        checkPattern(element);
      })
    });
  }

  // On computer turn remove listeners
  function removeListeners() {
    $('.square').css({ 'cursor':'default' });  // Back to 'default' cursor style
    $.each([1,2,3,4], function(index, element){
      $('#sqr' + element).off();
    });
  }

  // Checking player vs computer patterns
  function checkPattern(element){
    
    var playerSelection = element;
    console.log('Player Selection: ', playerSelection);
    // var 'control' is defined in setUp as being equal to 0
    // If player select the first element correctly
    if(playerSelection == pattern[control]){
      
      // Match the 'control' variable and check if there are more elements in the pattern array    
      if(pattern.length - 1 === control){ // No more values in array? 
        level = level + 1; // Player pass to next level
        
        // Update Score and Level
        updateScores();

        // Return control to zero
        control = 0;

        // Every five levels, speedness is increase
        if(level % 5 === 0) {
          speedness = speedness - 110;
        }

        // Inform to player with voice and pop-up text 
        $('#instruction-msg').html('<h1 class="animated zoomIn">LEVEL: ' +level+'</h1>');
        sound = $('#' + levelPref + level)[0];
        sound.currentTime = 0;
        sound.play();
        sound = '';

        // Remove listener to avoid conflict with next level pattern
        removeListeners();
        // Call to next step in the pattern
        setTimeout(function(){
          $('h1').remove();
          // Call to next level pattern
          newPattern();
        }, 2000);
      } else {
        console.log('Answer was right, but there are more numbers')
        control++; // Add one to 'control' to check next index value
      }
    } else {  // If player makes a mistake  
      console.log('player fails');
      finishTime = $.now(); 
      console.log('This game finishes at: ', finishTime);
      // Call to game over function
      gameOver();
    }
  }

  function updateScores() {
    console.log('this is control : ', control);
    console.log('this is pattern len : ', pattern.length);
    if(control === 0) { control++; }
    score += control * 10;
    $('#level').html('LEVEL: ' + level);
    $('#score').html('SCORE: ' + score);
  }

  function gameOver(){
    console.log('Game Over');
    // Update Score and Level
    updateScores();
    removeListeners();
    resetVariables();
    // Pop-up text and voice, then call to message function
    $('#instruction-msg').html('<h1 class="animated zoomIn">GAME OVER</h1>');
    setTimeout(function(){
      $('h1').remove();
      message('gameOver');
    }, 3000);
    sound = $('#sound_gameover')[0];
    sound.currentTime = 0;
    sound.play();
    sound = '';
    // Hide scores
    $('#scores').toggleClass("ng-hide", true);
  }

// End of setUp
}









