$(document).ready(function(){
  console.log('Ready!!!');

  setUp();

});

// For showing the pattern to newbee or a blind person
function showBlinking(){
  var instructions = [
    'This is the top left square, which is color blue and sounds like this...',
    'This is the top right square, which is color yellow and sounds like this...',
    'This is the bottom left square, which is color red and sounds like this...',
    'This is the bottom right square, which is color green and sounds like this...'
  ];
  $.each([1,2,3,4], function(index, element){      
    time = index * 2000;
    setTimeout(function(){
      console.log('square id: ', element);
      blink(element);   
      $('# instruction-msg').html('<p>' + instructions[index] +'</p>');
    }, time);
  });
};


function setUp() {
  // Variables at the beggining of the game
  var computerPattern = [];
  var playerPattern = [];
  var startTime;
  var level = 0;
  var score = 0;
  // For the speed of the computer pattern, may be change to adjust complexity
  var speedness = 2000;

  $('#startButton').on('click', buildingBoard);
  $('#quitButton').on('click', quit);

}

// On player turn put listeners to check if his/her pattern match computer one
function playerTurn() {
  $('#sqr1').on('click', checkPattern);
  $('#sqr2').on('click', checkPattern);
  $('#sqr3').on('click', checkPattern);
  $('#sqr4').on('click', checkPattern);
}

// Function to create pattern for the game
function newPattern() {

  for(i = 0; i < level + 1; i++ ){
    // Getting a number between 1-4
    number = Math.floor(Math.random() * 4) + 1;
    computerPattern.push(number);
  }
  console.log('Next is the pattern:', computerPattern);

  // throught looping we get the DIVs with ids: #sqr1, #sqr2..
  // need doBlink to use them to make colors change on the board 
  $.each(computerPattern, function(index, element){
      time = index * speedness;
      console.log(time);
      setTimeout(function(){
        blink(element);
      }, time);
  });

  // Getting starting time of this game
  if(level == 0) {
    startTime = $.now(); 
    console.log('This game starts at: ', startTime);
  }
}

function blink(element){
  // Getting window element, toggling class to make it enlightened
  $('#sqr'+element+'.div'+element).toggleClass('div'+element+'light');
  // Playing sound associated to that element 
  var sound = $('.sound' + element)[0];
  sound.currentTime = 0;
  sound.play();
  // Calling toggleClass again to 'switch off' square, and clear var 'sound'
  setTimeout(function(){
    $('#sqr'+element+'.div'+element).toggleClass('div'+element+'light');
    var sound = '';
  }, 300);
};

// Checking player vs computer patterns
function checkPattern() {

}























