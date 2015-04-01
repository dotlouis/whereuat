angular.module('whereuat', ['ionic','ngOpenFB', 'whereuat.controllers'])

.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    $stateProvider.state('onboarding', {
        url: "/onboarding",
        templateUrl: "templates/onboarding.html",
        controller: 'OnboardingCtrl',
        resolve: {
            signedUser: function($openFB, $state){
                $openFB.isLoggedIn().then(function(loggedIn){
                    $state.go('app.feed');
                });
            }
        }
    })
    .state('app', {
        url: "/app",
        abstract: true,
        template: '<ion-nav-view name="main" animation="slide-left-right"></ion-nav-view>',
        controller: 'AppCtrl',
        resolve: {
            signedUser: function($openFB, $state){
                return $openFB.isLoggedIn().catch(function(error){
                    $state.go('onboarding');
                });
            }
        }
    })
    .state('app.feed', {
        url: "/feed",
        views: {
            'main@app' :{
                templateUrl: "templates/feed.html",
                controller: 'FeedCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/feed');
}])

.run(['$ionicPlatform','$openFB', function($ionicPlatform, $openFB) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
    $openFB.init({appId: '406907122821860'});
}]);
