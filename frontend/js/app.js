angular
  .module('SimonGameApp', ['ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup.html'
    }),
  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'index.html'
    })

};