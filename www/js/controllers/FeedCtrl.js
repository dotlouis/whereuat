angular.module('whereuat.controllers')

.controller('FeedCtrl', ['$scope','$ionicPlatform','$cordovaBackgroundGeolocation','$cordovaGeolocation', function($scope, $ionicPlatform, $cordovaBackgroundGeolocation, $cordovaGeolocation){

    var locationOptions = {
        desiredAccuracy: 5000, // 5km
        stationaryRadius: 7000, // 7km
        url: "https://api.parse.com/1/classes/Location",
        headers: {
            'X-Parse-Application-Id':'ID',
            'X-Parse-REST-API-Key':'KEY'
        },
        // notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
        // notificationText: 'ENABLED',
        activityType: 'AutomotiveNavigation',
        stopOnTerminate: false
    };

    var yourAjaxCallback = function(response) {
        ////
        // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
        //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        //
        //
        bgGeo.finish();
    };

    var callbackFn = function(location) {
        console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
        // Do your HTTP request here to POST location to your server.
        //
        //
        yourAjaxCallback.call(this);
    };
    var failureFn = function(error) {
        console.log('BackgroundGeoLocation error');
    };


    $ionicPlatform.ready(function() {
        $cordovaBackgroundGeolocation.configure(locationOptions)
        .then(null, // Background never resolves
            function (err) { // error callback
                console.error(err);
            },
            function (location) { // notify callback
                console.log(location);
            }
        );
        $scope.startBackgroundGeolocation = function () {
            $cordovaBackgroundGeolocation.start();
        };
        $scope.stopBackgroundGeolocation = function () {
            $cordovaBackgroundGeolocation.stop();
        };
        $scope.locateMe = function(){
            $cordovaGeolocation.getCurrentPosition({
                timeout: 10000,
                maximumAge: 10000000,
                enableHighAccuracy: false
            })
            .then(function(position){
                console.log(position);
            })
            .catch(function(error){
                console.log(error);
            });
        };
    });

}]);
