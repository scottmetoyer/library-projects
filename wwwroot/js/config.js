(function() {
  // ===============================================================================
  // Config
  //

  function config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    // Default url
    $urlRouterProvider.otherwise("/pages");
    $locationProvider.hashPrefix('!');

    $ocLazyLoadProvider.config({
      debug: false
    });

    // Routes
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        templateUrl: 'views/common/layout.html',
      })
      .state('pages.in-flight', {
        url: '',
        templateUrl: 'views/in-flight.html',
        data: { pageTitle: 'In-flight projects' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                serie: true,
                name: 'ng-sortable',
                files: [
                  'js/libs/jquery-sortable.js'
                ]
              },
            ]);
          },
        }
      })
      .state('pages.on-deck', {
        url: '/on-deck',
        templateUrl: 'views/on-deck.html',
        data: { pageTitle: 'On-deck projects' },
        resolve: {
          // Load plugins here
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([]);
          },
        },
      })
      .state('pages.backlog', {
        url: '/backlog',
        templateUrl: 'views/backlog.html',
        data: { pageTitle: 'Backlog projects' },
        resolve: {
          // Load plugins here
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([]);
          },
        },
      })
      .state('pages.create-project', {
        url: '/create-project',
        templateUrl: 'views/create-project.html',
        data: { pageTitle: 'Create a project' },
        resolve: {
          // Load plugins here
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([]);
          },
        },
      })
      .state('pages.view-project', {
        url: '/view-project/:key',
        templateUrl: 'views/view-project.html',
        data: { pageTitle: 'Project dashboard' },
        resolve: {
          // Load plugins here
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([]);
          },
        },
      });
  };

  function run($rootScope, $state) {
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function() {
      // Restart page loader
      if (window.Pace && typeof window.Pace.restart === 'function') {
        window.Pace.restart();
      }
    });
  }

  angular.module('pixeladmin')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider', config])
    .run(['$rootScope', '$state', run]);

})();
