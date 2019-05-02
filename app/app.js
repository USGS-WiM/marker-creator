var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'homeController'
    })
    .otherwise({
        redirectTo: "/"
    });

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
});


app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}])




app.controller('mainController', [
    '$scope', '$timeout', '$window', '$location', 
    '$document', '$anchorScroll', '$rootScope',
function(
    $scope, $timeout, $window, $location, 
    $document, $anchorScroll, $rootScope
){
    
    // Dev Mode
    $scope.devMode = true;

    // Scroll to
    // Scroll to
    $scope.scrollTo = function(anchor){
        $anchorScroll(anchor)
    }

    // Go To Route
    // Go To Route
    $scope.pageTransitioning = false;
    $scope.go = function (path) {

        if($scope.path == path){return;}
        // 500ms buffer for animations
        $timeout(function(){
            $location.path(path);
        }, 500);
    };

    // Dev Mode Functions
    // Dev Mode Functions
    $scope.devLog = function(log){
        if($scope.devMode){
            console.log(log);
        }
    }



}]);

// Send all errors to slack
// Send all errors to slack
// Send all errors to slack
// angular.module('app').factory('$exceptionHandler', function ($log, $injector) {
//     return function myExceptionHandler(exception, cause) {
//         $log.error(exception, cause);

//         var text = 
//             "*LINE:* `" + exception.lineNumber + "`" + 
//             "\n*STRING:* `" + exception.toString() + "`" + 
//             "\n*MESSAGE:* `" + exception.message + "`" +
//             "\n```" + exception.stack + "```" +
//             "\n*CAUSE:* `" + cause + "`";
        
//         var url = "https://hooks.slack.com/services/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" // Webhook URL

//         $.ajax({
//             data: 'payload=' + JSON.stringify({
//                 "text": text,
//                 "username": "JSERROR",
//                 "icon_emoji": ":interrobang:"
//             }),
//             dataType: 'json',
//             processData: false,
//             type: 'POST',
//             url: url
//         });

//     };
// });

