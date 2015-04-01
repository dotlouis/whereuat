angular.module('whereuat.controllers')

.controller('AppCtrl', ['$scope','$state','$ionicHistory','$openFB','signedUser', function($scope, $state, $ionicHistory, $openFB, signedUser){

    console.log(signedUser);

    $ionicHistory.clearHistory();

    $scope.logout = function(){
        $openFB.revokePermissions()
        .then(function(revoked){
            $state.go('onboarding');
            console.log(revoked);
        })
        .catch(function(notRevoked){
            console.log(notRevoked);
        });
    };

}]);
