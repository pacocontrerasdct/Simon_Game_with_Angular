var Player = require('../models/player');
//var game = require('../models/game');

// GET ALL PLAYERS
function getAll(request, response) {  
  Player.find(function(error, players) {
    if(error) response.json({message: 'Could not find any player'});
    response.json({players: players});
  }).select('-__v');
}

// POST A NEW PLAYER
function createPlayer(request, response) {
  var newPlayer = new Player(request.body);
  newPlayer.save(function(error) {
    if(error) response.json({messsage: 'Could not create new player b/c:' + error});
    response.json({player: newPlayer});
  });
}

// GET A PLAYER
function getPlayer(request, response) {
  var id = request.params.id;
  Player.findById({_id: id}, function(error, player) {
    if(error) response.json({message: 'Could not find player b/c:' + error});
    response.json({player: player});
  }).select('-__v');
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
  removePlayer: removePlayer
}