$(document).ready(function(){
  console.log('Ready!!!');

  setUp();

});

function setUp(){
  numX = 0;
  randomPattern = [];
  playerPattern = [];
  // Building the page
  // $('body').html('<div id="bigContainer" class="bigContainerClass"><header></header><main></main><aside></aside><footer></footer></div>');
  // $('header').html('<h1 id="h1Header"><h2 id="h2Header">'); 
  // $('#h1Header').append('Simon Game');
  // $('#h2Header').append('A challenge to your mind');
  // $('main').html('<p id="parr1"><p id="parr2">');
  // $('main').append('<button id="startButton"><button id="quitButton">');
  // $('#parr1').append('Welcome to <em>Simon On -Line</em>, an online game based in an electronic game of memory skill invented by Ralph H. Baer and Howard J. Morrison, with software programming by Lenny Cope. Simon was launched in 1978 at Studio 54 in New York City and was an immediate success, becoming a pop culture symbol of the 1970s and 1980s.').toggleClass("visible");
  // $('#parr2').append('Instructions to play: The application has four colored areas inside of a black circle, each producing a particular blink when it is clicked or activated by the computer. A round in the game consists of the computer lighting up one or more areas in a random order, after which the player must reproduce that order by clicking the same areas. As the game progresses, the number of areas to be clicked increases.').toggleClass("visible");
  $('#startButton').append('START').on('click', buildingBoard);
  $('#quitButton').append('QUIT').on('click', quit);
};

  // Declaring some variables
  var squareContainer;
  var squareTopLeft;
  var squareTopRight;
  var squareBottomLeft;
  var squareBottomRight;
  var randomPattern = [];
  var playerPattern = [];
  var playerName;
  var playersData = [];
  var numX = 0;
  var startTime;
  var levelPassed = 0;

// Building Squares, or in others words css properties for colored divs
function SquareFactory(backgroundColor, opacity, width, height, margin, padding, display, borderRadius, mozBorderRadius, webkitBorderRadius){
  this.backgroundColor = backgroundColor;
  this.opacity = opacity;
  this.height = height;
  this.width = width;
  this.margin = margin;
  this.padding = padding;
  this.display = display;
  this.borderRadius = borderRadius;
  this.mozBorderRadius = mozBorderRadius;
  this.webkitBorderRadius = webkitBorderRadius;
};

function buildingBoard(){
 // // Building a container and the four div for each square of the board
 //  $('main').html('<div id="container" class="containerClass">');
 //  $('#container').html('<div id="sqr1" class="sqr" data-numberSquare="1"></div><div id="sqr2" class="sqr" data-numberSquare="2"></div><div id="sqr3" class="sqr" data-numberSquare="3"></div><div id="sqr4" class="sqr" data-numberSquare="4"></div>');
 //  // Giving css attributes to the container and squares using a Square Factory:
 //  // (backgroundColor, width, height, margin, padding, display, borderRadius, mozBorderRadius, webkitBorderRadius)
 //  squareContainer = new SquareFactory('rgb(0,0,0)', '1', '200px', '200px', '50px auto', '2px', 'block', '200px', '200px', '200px');
 //  squareBlue = new SquareFactory('rgb(5,135,255)', '0.7', '100px', '100px', '0', '0', 'inline-block', '100px 0 50px 0', '100px 0 50px 0', '100px 0 50px 0');
 //  squareYellow = new SquareFactory('rgb(255,255,0)', '0.7', '100px', '100px', '0', '0', 'inline-block', '0 100px  0 50px', '0 100px  0 50px', '0 100px  0 50px');
 //  squareRed = new SquareFactory('rgb(255,0,0)', '0.7', '100px', '100px', '0', '0', 'inline-block', '0 50px 0 100px', '0 50px 0 100px', '0 50px 0 100px');
 //  squareGreen = new SquareFactory('rgb(0,255,0)', '0.7', '100px', '100px', '0', '0', 'inline-block', '50px 0 100px 0', '50px 0 100px 0', '50px 0 100px 0');
  
 //  // Adding CSS atributes
 //  $('.containerClass').css(squareContainer);
 //  $('.containerClass').css({
 //                              'text-align':'center',
 //                              'vertical-align':'center',
 //                              'border':'5px solid black'
 //  });

  // Adding colored div with click event
  // $('#sqr1').css(squareBlue).on('click', recordingPlayerPattern);
  // $('#sqr2').css(squareYellow).on('click', recordingPlayerPattern);
  // $('#sqr3').css(squareRed).on('click', recordingPlayerPattern);
  // $('#sqr4').css(squareGreen).on('click', recordingPlayerPattern);

  $('#sqr1').on('click', recordingPlayerPattern);
  $('#sqr2').on('click', recordingPlayerPattern);
  $('#sqr3').on('click', recordingPlayerPattern);
  $('#sqr4').on('click', recordingPlayerPattern);

  // Ask player for his name
  // playerName();
  buildingScore(levelPassed);
};

// New player function with Name, max level, startTime from the beginning of game, record is a combination between levels passed and total time spent to pass them, playerPattern is the recording of the last pattern player did (helps to check with randomPattern)
function NewPlayer(simonPlayer){ 
  this.name = simonPlayer;
  this.level = numX;
  this.startTime = $.now() + 2627;
  this.recordTime = ($.now()) - this.startTime;
  this.playerPattern = playerPattern;
};

function playerName(){
  // After showing board ask to player for a name
  console.log('hello player');

  // Building a input area and a button to get player name
  $('aside').html('<p id="giveMeName"></p><input id="inputName" type="text" placeholder="Enter a name" autofocus/><button id="getNameButton" type="button">Get me!');
  $('#giveMeName').append('To start the game I will need your name, so I can keep your achievements updated in our Hall Of Fame.');
  // On 'click' getting name
  $('#getNameButton').on('click',function(){
    inputFromPlayer = $('#inputName');
    simonPlayer = inputFromPlayer.val();
    // Creating a new player
    playerId = new NewPlayer(simonPlayer); // I'll need to create an object to keep
                                    //all different players while the game is running  
    console.log(playerId);
    // Cleaning Aside area to fit next texts
    $('aside').html('');
    
    // Calling to Countdown to Start the real game
    countDown();
  });
}

// Countdown to start the game after player enter his/her name
function countDown(){
  countDownNumbers = ['1','2','3','4']; 
  $.each(countDownNumbers, function (index, element){
    spanTag = $('aside').append('<span id="spanCountDown' + element + '">');
  });

  $('#spanCountDown1').append(countDownNumbers[2] + '... ').delay(500).slideUp(200, 0);
  $('#spanCountDown2').append(countDownNumbers[1] + '... ').delay(1000).slideUp(200, 0);
  $('#spanCountDown3').append(countDownNumbers[0] + '... ').delay(1500).slideUp(200, 0);
  $('#spanCountDown4').append('Go!').delay(2000).slideUp('slow', function(){
    buildingScore(levelPassed); 
  });
 };

function buildingScore(levelPassed){
  // if(levelPassed === 0){
  //   $('aside').append('<span id="spanScore1"></span><br><button id="checkPlayerPatternButton"></button><br><span id="spanScore2"></span><span id="spanScore3"></span>');
  //   nombre = playerId.name;
  //   $('#spanScore1').slideDown(1000, 0).html('Hi ' + nombre + ', wait until computer ends its pattern; after that, click the colorful areas repeating its pattern. Click CHECK to know if you did it well');
  //   $('#checkPlayerPatternButton').delay(3000).append('CHECK').on('click', comparePatterns);
  //   $('#spanScore2').html('Level: ');
  //   $('#spanScore3').html(levelPassed);
  // }else{
  //   levelPassed = numX;
  //   spanText = $('#spanScore1').html('That was a correct answer ' + nombre);
  //   spanText.fadeTo(300, 1).delay(1000).fadeTo(300, 0);
  // };
  // $('#spanScore3').html(levelPassed);
  // setTimeout(function(){
    randomizer();
  // }, 2000);
};

// Getting a number between 1 and 4 to choose square Id
function idOfSquare(){
  var idOfSquare = Math.floor(Math.random() * 4) + 1;
  return idOfSquare;
}

// Returns a random integer between numX and 1
function randomizer(){
  var numSquaresForPattern = Math.floor(Math.random() * numX) + 1;
  // Loop to create a pattern made by idOfSquare random numbers
  for(i = 0; i <= numSquaresForPattern; i++){
    number = idOfSquare();
    randomPattern.push(number);
  }
  console.log('Next is the pattern:');
  console.log(randomPattern);
  // Getting starting time of game from the very first moment when ramdomPattern starts
  startTime = $.now(); 
  console.log(startTime);
  // throught looping we get the DIVs with ids: #sqr1, #sqr2..
  // need doBlink to use them to make colors change on the board 
  $.each(randomPattern, function(index, element){
    doBlink(index, element);
  });
}

function doBlink(index, element){
  time = index * 2000;
  console.log(time);
  setTimeout(function(){
    blink(element);
  }, time);
}

function blink(element){
  // $('#sqr'+element).fadeTo(250, 0.5).fadeTo(250, 1);
  $('#sqr'+element+'.div'+element).toggleClass('div'+element+'light');

  var sound = $('.sound' + element)[0];
  sound.currentTime = 0;
  sound.play();

  setTimeout(function(){
    $('#sqr'+element+'.div'+element).toggleClass('div'+element+'light');
    sound.stop();
    var sound = '';
  }, 300);
};

function recordingPlayerPattern(){
  // Each square has a dataset number as Id so I'm collect it now
  numSqr = $(this)[0].dataset.numbersquare;
  // Every player click blink too
  blink(numSqr);
  // save each click (so Player Pattern)
  playerPattern.push(numSqr); 
  console.log('Next is an array with playerPattern:');
  console.log(playerPattern);
};

// Comparing patterns to check if player pass or fail
function comparePatterns(){
  computer = randomPattern.join();
  player = playerPattern.join();
  playerPattern = []; // clean player pattern array
  // If player did it well
  if(computer === player){
    levelPassed = 1; // just control to present a different text by screen
    randomPattern = []; // Empty computer Pattern here because if player fail,
                        //want to show las computer pattern as a final solution
    numX++; // Make level higher, one number more for randomizer
    buildingScore(levelPassed); // Call back to next round
  }
  else{
    // Reset variable for randomizer
    numX = 0;
    levelPassed = 0;
    gameOver(); // If player fails go to game over
  }
  console.log(computer);
  console.log(player);
};

function gameOver(){
  $('#spanScore1').html('');
  $('#spanScore2').html('');
  $('#spanScore3').html('');
  $('aside').append('<span id="spanGameOver1"></span><br/><span id="spanGameOver2"></span><br/><span id="spanGameOver3"></span><br/><span id="spanGameOver4"></span>');
  $('#spanGameOver1').slideUp('slow').delay(2000).html('You made a mistake while repeating the pattern.').slideDown('slow').delay(2000);
  $('#spanGameOver2').slideUp('slow').delay(4000).html('The Game is over!').slideDown('slow').delay(2000);
  $('#spanGameOver3').slideUp('slow').delay(6000).html('Look at Simon, I will show you what was the right pattern...').slideDown('slow').delay(2000);
  $('#spanGameOver4').slideUp('slow').delay(8000).slideDown('slow', function(){
        console.log(randomPattern);
        $.each(randomPattern, function(index, element){
          doBlink(index, element);
        });
  }).delay(8000);
  //playerUpdate();
  setTimeout(function(){
    hallOfFame();
  }, 6000);
  

};

function playerUpdate(){
  // getting time now and when players started this game
  now = $.now();
  start = playerId.startTime;
  recordTime = now - start;
  name = playerId.name;
  level = playerId.level;
  // Going back to a previous state of variables
  numX = 0;
  levelPassed = 0;
  // Saving data in array for using later in hall of fame
  savingPlayersData(name, level, recordTime);
}

// Tracking all different players while game is active
// Helpful for hall of fame
function savingPlayersData(name, level, recordTime){
    var playerToSave = name + ',' + level + ',' + recordTime;
    playersData.push(playerToSave);
    console.log('Players Data in savingPLayersData', playersData);
};

// This function close the window and finishes the game
function quit(){
  url = "https://www.google.co.uk/";
  var newWindow = window.open('', '_self', ''); //open the current window
  window.close(url);
};

function hallOfFame(){
  // Replacing 'Check it out' button for 'Restart' button
  $('#checkPlayerPatternButton').delay(3000).html('RESTART').on('click', setUp);
  
  //debugger;
  //console.log('hall1 ' ,playersData);
  //$('aside').append('<span id="hallOfFameId" class="visible">');
  //$('#hallOfFameId').html('HALL OF FAME:<br>');

  //$.each(playersData, function (index, element){
  //    playerProfile =+ element + '<br>';
  //    console.log('hall2 ' , playerProfile);
  //    //arrayProfile = playerProfile.split(',');
  //    //$('#hallOfFameId').html('"<span id="profile' + index + '" class="visible">Name: ' + arrayProfile[//0] + ' - Level: ' + arrayProfile[1] + ' - Crono: ' + arrayProfile[2] + '</span>');
  //});
};











