angular
  .module('SimonGameApp', ['ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('welcome', {
      url: '/',
      templateUrl: 'views/welcome.html'
    }),
  $stateProvider
    .state('instructions1', {
      url: '/instructions1',
      templateUrl: 'views/instructions1.html'
    }),
  $stateProvider
    .state('instructions2', {
      url: '/instructions2',
      templateUrl: 'views/instructions2.html'
    }),
  $stateProvider
    .state('login', {
      url: '/login',
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
    }),
  $stateProvider
    .state('play', {
      url: '/play',
      templateUrl: 'views/play.html'
    }),
  $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html'
    })

};

