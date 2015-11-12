angular.module('SimonGameApp')
.controller('playersController', playersController);

// Injecting window for redirecting purposes as a way of mocking a login/ signup
// system, but know it's not the right way. Should use passportJS in the back-end

playersController.$inject = ['$http', '$window'];

function playersController($http, $window){
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
  //getPlayers();

  // When log in, cheking in db if player already exist
  self.selectPlayer = selectPlayer;
  self.remindPlayer = {};

  function selectPlayer() {
    console.log('inside SelectPlayer');
    console.log("Player for Select: ", self.remindPlayer.email);
    $http
      .get('http://localhost:3000/players/' + self.remindPlayer.email)
      .then(function(response) {
          console.log("Response after find player for email >>>", response.data.message)
      })
    self.remindPlayer = {};
  }

  // When log in
  self.getPlayer = getPlayer;
  self.login = {};

  function getPlayer() {
    console.log('inside getPlayer, alias: ', self.login.name);
    console.log('inside getPlayer, email: ', self.login.email);
    $http
      .get('http://localhost:3000/player/' + self.login.name + '&'+ self.login.email)
      .then(function(response) {
          console.log("Get player Response!!! ", response);
          // Using window.location I'm able to send to play after log in
          $window.location.href = '#/play';
      })
    self.login = {};
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
          // Using window.location I'm able to send to play after sign up
          $window.location.href = '#/play';
      })
    self.newPlayer = {};
  }

}