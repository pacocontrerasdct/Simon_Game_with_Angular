var Player = require('../models/Player');
//var Game = require('../models/Game');

// GET ALL PLAYERS
function getAll(request, response) {  
  Player.find(function(error, players) {
    if(error) response.json({message: 'Could not find any player'});
    response.json({players: players});
  }).select('-__v');
}

// FIND A PLAYER'S DATA
function findPlayerData(request, response) {
  console.log('Hitting findPlayerData for email at api');
  console.log('coming from email', request.params.email)
  var email = request.params.email;
  Player.find({'email': email}, function(error, player) {
    if(error) response.json({message: 'Could not find player b/c:' + error});
    // If find a match in DB get name/alias and send info to player
    console.log("the name asociated to the email is: ", player[0].name);

    response.json({message: '"Email send to Player successfully"', player: player[0].name});
  }).select('-__v');
}

// POST A NEW PLAYER
function createPlayer(request, response) {
  console.log('Hitting createPlayer at api');
  console.log(request.body)
  var newPlayer = new Player(request.body);
  newPlayer.save(function(error) {
    if(error) response.json({messsage: 'Could not create new player b/c:' + error});
    response.json({player: newPlayer});
  });
}

// GET A PLAYER
function getPlayer(request, response) {
  console.log('Hitting getPlayer at api')
  // var id = request.params.id;
  // Player.findById({_id: id}, function(error, player) {
  //   if(error) response.json({message: 'Could not find player b/c:' + error});
  //   response.json({player: player});
  // }).select('-__v');
}

// UPDATE A PLAYER
function updatePlayer(request, response) {
  var id = request.params.id;
  Player.findById({_id: id}, function(error, player) {
    if(error) response.json({message: 'Could not find player b/c:' + error});
    if(request.body.name) player.name = request.body.name;
    if(request.body.level) player.start = request.body.level;
    if(request.body.score) player.end = request.body.score;

    player.save(function(error) {
      if(error) response.json({messsage: 'Could not update player details b/c:' + error});
      response.json({message: 'Player successfully updated', player: player});
    });
  }).select('-__v');
}

// DELETE A PLAYER
function removePlayer(request, response) {
  var id = request.params.id;
  Player.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete player b/c:' + error});

    response.json({message: 'Player successfully deleted'});
  }).select('-__v');
}


module.exports = {
  getAll: getAll,
  createPlayer: createPlayer,
  getPlayer: getPlayer,
  updatePlayer: updatePlayer,
  removePlayer: removePlayer,
  findPlayerData: findPlayerData
}