angular.module('SimonGameApp')
.controller('playersController', playersController);

playersController.$inject = ['$http'];

function playersController($http){
  console.log('I am the frontend controller');
  var self = this;
  self.all = [];

  // Getting all names and scores to present a hall of fame
  function getPlayers() {
    $http
      .get('http://localhost:3000/players')
      .then(function(response) {
        console.log("Response in getPlayers ", response)
        self.all = response.data.players;
      });
  }
  getPlayers();

  // When log in, cheking in db if player already exist
  self.selectPlayer = selectPlayer;

  function selectPlayer(player) {
    console.log('inside SelectPlayer');
    console.log("Player for Select: ", player);
    self.onePlayer = player;
  }

  // When sign up a new player, app records data
  self.addPlayer = addPlayer;
  self.newPlayer = {};

  function addPlayer() {
    console.log('inside addPlayer');
    console.log(self.newPlayer);
    $http
      .post('http://localhost:3000/players', self.newPlayer)
      .then(function(response) {
          console.log("Response after add player", response)
          getPlayers();
      })
    self.newPlayer = {};
  }

}