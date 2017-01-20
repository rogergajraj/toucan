angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
  }, {
    title: 'Chill',
    id: 2
  }, {
    title: 'Dubstep',
    id: 3
  }, {
    title: 'Indie',
    id: 4
  }, {
    title: 'Rap',
    id: 5
  }, {
    title: 'Cowbell',
    id: 6
  }];
})


.controller('onboardingCtrl', ['$q', '$ionicPlatform', '$scope', '$rootScope', '$cordovaSQLite', '$state', '$http', '$window', '$ionicSlideBoxDelegate', '$ionicSideMenuDelegate', '$ionicHistory', function($q, $ionicPlatform, $scope, $rootScope, $cordovaSQLite, $state, $http, $window, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $ionicHistory) {
    console.log("slide controller started load");
    $ionicSideMenuDelegate.canDragContent(false); //disables menu

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {

      facebookConnectPlugin.getLoginStatus(function(success) {


        if (success.status === 'connected') {
          // The user is logged in and has authenticated your app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed request, and the time the access token
          // and signed request each expire
          console.log('FB--getLoginStatus', success.status);

          //log who logged in and send data to cloud
          getFacebookProfileInfo(success.authResponse)
            .then(function(profileInfo) {

              $http.post("http://www.guyanago.com/woodford/services/api.php", {
                action: 'checkin',
                customer: JSON.stringify(profileInfo)
              }).
              then(function(res) {
                console.log(res.data);
              });

            });

          //enter app
          $ionicSideMenuDelegate.canDragContent(true); //enables menu

          $state.go('app.tabs.deals');
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
        } else {
          // If (success.status === 'not_authorized') the user is logged in to Facebook,
          // but has not authenticated your app
          // Else the person is not logged into Facebook,
          // so we're not sure if they are logged into this app or not.

          console.log('getLoginStatus', success.status);

          //$ionicLoading.show({
          //  template: 'Logging in...'
          //});

          // Ask the permissions you need. You can learn more about
          // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
        }
      });
    };

    var fbLoginSuccess = function(response) {
      if (!response.authResponse) {
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;
      console.log("Auth response: " + authResponse);

      //log who logged in and send data to cloud
      getFacebookProfileInfo(authResponse)
        .then(function(profileInfo) {

          $http.post("http://www.guyanago.com/woodford/services/api.php", {
            action: 'checkin',
            customer: JSON.stringify(profileInfo)
          }).
          then(function(res) {
            console.log(res.data);
          });

        });

      $ionicSideMenuDelegate.canDragContent(true); //enables menu

      $state.go('app.tabs.deals');
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    };

    // This is the fail callback from the login method
    var fbLoginError = function(error) {
      console.log('fbLoginError', error);
      //$ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function(authResponse) {
      var info = $q.defer();

      facebookConnectPlugin.api('/me?fields=id,first_name,last_name,email,gender&access_token=' + authResponse.accessToken, null,
        function(response) {
          console.log(response);
          info.resolve(response);
        },
        function(response) {
          console.log(response);
          info.reject(response);
        }
      );
      return info.promise;
    };


  }])
  .controller('TabsHomeCtrl', function($scope, $stateParams) {

  })
  .controller('MenuFoodTabCtrl', function($scope, $stateParams) {

  })
  .controller('DealsTabCtrl', function($scope, $stateParams) {})
  .controller('InitCtrl', function($q, $scope, $stateParams, $state, $ionicPlatform) {

    $ionicPlatform.ready(function() {
      console.log('rg: ready');
      $scope.facebookSignIn();
    });

    $scope.facebookSignIn = function() {

      facebookConnectPlugin.getLoginStatus(function(success) {


        if (success.status === 'connected') {
          // The user is logged in and has authenticated your app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed request, and the time the access token
          // and signed request each expire
          console.log('FB--getLoginStatus', success.status);

          //log who logged in and send data to cloud
          getFacebookProfileInfo(success.authResponse)
            .then(function(profileInfo) {

              $http.post("http://www.guyanago.com/woodford/services/api.php", {
                action: 'checkin',
                customer: JSON.stringify(profileInfo)
              }).
              then(function(res) {
                console.log(res.data);
              });

            });

          //enter app
          //$ionicSideMenuDelegate.canDragContent(true); //enables menu

          $state.go('app.tabs.deals');
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
        } else {
          // If (success.status === 'not_authorized') the user is logged in to Facebook,
          // but has not authenticated your app
          // Else the person is not logged into Facebook,
          // so we're not sure if they are logged into this app or not.

          console.log('getLoginStatus', success.status);
          $state.go('onboarding');
          return;
          //$ionicLoading.show({
          //  template: 'Logging in...'
          //});

          // Ask the permissions you need. You can learn more about
          // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
        }
      });
    };

    var fbLoginSuccess = function(response) {
      if (!response.authResponse) {
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;
      console.log("Auth response: " + authResponse);

      //log who logged in and send data to cloud
      getFacebookProfileInfo(authResponse)
        .then(function(profileInfo) {

          $http.post("http://www.guyanago.com/woodford/services/api.php", {
            action: 'checkin',
            customer: JSON.stringify(profileInfo)
          }).
          then(function(res) {
            console.log(res.data);
          });

        });

      //$ionicSideMenuDelegate.canDragContent(true); //enables menu

      $state.go('app.tabs.deals');
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    };

    // This is the fail callback from the login method
    var fbLoginError = function(error) {
      console.log('fbLoginError', error);
      //$ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function(authResponse) {
      var info = $q.defer();

      facebookConnectPlugin.api('/me?fields=id,first_name,last_name,email,gender&access_token=' + authResponse.accessToken, null,
        function(response) {
          console.log(response);
          info.resolve(response);
        },
        function(response) {
          console.log(response);
          info.reject(response);
        }
      );
      return info.promise;
    };



  })
  .controller('RewardsTabCtrl', function($scope, $stateParams, $cordovaSQLite) {

    $scope.rewards = [];

    $scope.$on('$ionicView.enter', function(e, data) {

      $scope.rewards = []; //reset

      $cordovaSQLite.execute(db, 'select * from rewards ORDER BY id DESC ').then(

        function s(res) {
          for (var i = 0; i < res.rows.length; i++) {
            $scope.rewards.push(res.rows.item(i));

          }

          $scope.apply();

        },
        function e(err) {
          console.log('error reading rewards from db')
        });

    });


  })
  .controller('CheckinTabCtrl', function($scope, $stateParams, $rootScope, $cordovaSQLite) {


    //set the checkin discount coupon to hidden
    $scope.checked_in = false;


    //posts checkin image to facebook
    $scope.postCheckin = function() {

      facebookConnectPlugin.showDialog({
          method: "feed",
          picture: 'http://www.guyanago.com/woodford/services/images/checkin.png',
          name: 'Woodford Cafe',
          //message:'First photo post',
          caption: 'Having a great time at Woodford Cafe',
          description: 'I love this place!'
        },
        function(response) {
          /*give coupon*/
          //set expiry date
          var expiry = new Date();
          expiry.setHours(expiry.getHours() + 5);
          //save to mobile db
          $cordovaSQLite.execute(db, "INSERT into rewards (type, title, details, expiry) VALUES (?,?,?,?)", ['coupon', '5% off bill', 'present this coupon to waiter before you pay bill', expiry.toString()]).then(
            function s(res) {
              alert("check your rewards to get coupon");

              try {
                evothings.eddystone.stopScan();
                $scope.checked_in = false;
              } catch (e) {
                console.log('beacon cannot stop scan on web');

              }

            },
            function e(res) {
              alert("error setting award in db", res);
            });
        },
        function(response) {
          if (response.errorCode == "4201") {
            alert("Sorry, you have to post to facebook in order to receive discount coupon");
          }
        });

    }

    function successCallback(beacon) {
      $scope.header = "You're here!";
      $scope.status = "we found you! You're in Woodford Cafe";
      //$scope.status = 'Jippie, found a beacon: ' + beacon.name;
      $scope.$apply();

      $scope.checked_in = true;

    }


    function errorCallback(error) {
      $scope.status = 'Darn, something went wrong: ' + error;
    }



    //start scanning for beacon when entering checkin view
    $scope.$on('$ionicView.enter', function(e, data) {

      //set the checkin discount coupon to hidden
      $scope.checked_in = false;

      //set notification to searching
      $scope.header = "Are you here?";
      $scope.status = "searching to see if you're currently at Woodford Cafe..";

      setTimeout(function() {
        try {
          evothings.eddystone.startScan(successCallback, errorCallback);
        } catch (e) {
          console.log('beacon cannot run scan on web')
        }

      }, 4000);

    });

    //stop scanning for beacon after leaving checkin view
    $scope.$on('$ionicView.leave', function(e, data) {
      //console.log('fromState', data);

      if (data.stateName == 'app.tabs.checkin') {
        try {
          evothings.eddystone.stopScan();
        } catch (e) {
          console.log('beacon cannot stop scan on web');

        }
      }


    });


  });
