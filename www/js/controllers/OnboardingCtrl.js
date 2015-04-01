angular.module('whereuat.controllers')

.controller('OnboardingCtrl', ['$scope','$state','$ionicHistory','$openFB', function($scope, $state, $ionicHistory, $openFB){

    $ionicHistory.clearHistory();

    $scope.fbLogin = function(){
        $openFB.login({scope: 'email,user_friends'})
        .then(function(status){
            // log in successful
            $state.go('app.feed');
        }, function(err){
            // error logging in
            console.log(err);
        });
    };
}]);
