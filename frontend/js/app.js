angular
  .module('SimonGameApp', ['ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'views/login.html'
    }),
  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html'
    }),
  $stateProvider
    .state('reminder', {
      url: '/reminder',
      templateUrl: 'views/reminder.html'
    })

};