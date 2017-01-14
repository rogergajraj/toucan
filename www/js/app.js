// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    try{
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }

    }catch(err){
      console.log('error with keyboard init cordova');
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //open database and create inital table
    db = $cordovaSQLite.openDB({
        name: "woodford.db",
        location: 'default'
    });

    //table for rewards
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS rewards (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, title TEXT, details TEXT, expiry TEXT)').then(
    function s(res) {
        console.log("created rewards table", res);
    },
    function e(res) {
        console.log("error creating rewards table", res);
    });

  });
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('onboarding', {
            url: '/onboarding',
            templateUrl: 'templates/onboarding.html',
            controller: 'onboardingCtrl'

        })

  .state('app.tabs', {
    url: "/hometabs",
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: 'templates/hometabs.html',
        controller: 'TabsHomeCtrl'
      }
    }
    //templateUrl: "templates/hometabs.html"
  })
  .state('app.tabs.deals', {
    url: "/deals",
    views: {
      'deals-tab': {
        templateUrl: "templates/deals.html",
        controller: 'DealsTabCtrl'
      }
    }
  })
  .state('app.tabs.checkin', {
    url: "/checkin",
    views: {
      'checkin-tab': {
        templateUrl: "templates/checkin.html",
        controller: 'CheckinTabCtrl'
      }
    }
  })
  .state('app.tabs.rewards', {
    url: "/rewards",
    views: {
      'rewards-tab': {
        templateUrl: "templates/rewards.html",
        controller: 'RewardsTabCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/onboarding');
});
