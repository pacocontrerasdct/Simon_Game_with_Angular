angular.module('SimonGameApp')
.controller('playersController', playersController);

playersController.$inject = ['$http'];

function playersController($http){
  console.log('I am the controller');


}