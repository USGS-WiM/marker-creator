var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
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
	



	
    // Variable Setup
    // Variable Setup
    // Variable Setup
    $scope.markerClasses = " wmm-pin wmm-red wmm-icon-circle wmm-icon-white wmm-size-25";
    $scope.markerShape = "wmm-pin";
    $scope.markerBackgroundColor = "wmm-red";
    $scope.markerIcon = "wmm-icon-circle";
    $scope.markerSize = "wmm-size-25";
    $scope.markerIconColor = "wmm-icon-white";

    $scope.hideBorder = false;



    // Select Marker Background
    // Select Marker Background
    // Select Marker Background
    $scope.changeMarkerShape = function(shape){
        $scope.markerShape = "wmm-" + shape;
        $scope.updateMarkerClasses();
    }

    // Select Marker Background
    // Select Marker Background
    // Select Marker Background
    $scope.changeMarkerBackground = function(color){
        $scope.markerBackgroundColor = "wmm-" + color;
        $scope.updateMarkerClasses();
        $scope.customMarkerBackgroundColor = "";
    }

    // Change to custom marker bg
    // Change to custom marker bg
    // Change to custom marker bg
    $scope.customMarkerBG = function(){
        if($scope.customMarkerBackgroundColor.length == 3 || $scope.customMarkerBackgroundColor.length == 6){
            var cc = $scope.customMarkerBackgroundColor;

            $scope.markerBackgroundColor = "wmm-" + cc;
            $scope.updateMarkerClasses();
    
            var css = ".wmm-" + cc + ":after{background-color:#" + cc + ";}";
            css = css + ".wmm-triangle.wmm-"+cc+"{border-bottom-color: rgba(0, 0, 0, 0.5);}.wmm-triangle.wmm-"+cc+":after{color: #"+cc+";}"
            $(".custom-bg-css").html(css);
        }
    }

    // Select Marker Icon
    // Select Marker Icon
    // Select Marker Icon
    $scope.changeMarkerIcon = function(icon, event){
        $scope.markerIcon = "wmm-icon-" + icon;
        $scope.updateMarkerClasses();
    }

    // Change Marker Icon Color
    // Change Marker Icon Color
    // Change Marker Icon Color
    $scope.changeMarkerIconColor = function(iconColor){
        $scope.markerIconColor = "wmm-icon-" + iconColor;
        $scope.updateMarkerClasses();
        $scope.customIconColor = "";
    }
    $scope.customIconBG = function(){
        if($scope.customIconColor.length == 3 || $scope.customIconColor.length == 6){
            var cc = $scope.customIconColor;

            $scope.markerIconColor = "wmm-icon-" + cc;
            $scope.updateMarkerClasses();
        
            var css = ".wmm-icon-" + cc + ":before{background-color:#" + cc + " !important;}";
            $(".custom-icon-css").html(css);
        }
    }

    // Change Marker Size
    // Change Marker Size
    // Change Marker Size
    $scope.changeMarkerSize = function(iconSize){
        $scope.markerSize = "wmm-size-" + iconSize;
        $scope.updateMarkerClasses();
    }

    // Update Marker Classes to reflect changes
    // Update Marker Classes to reflect changes
    // Update Marker Classes to reflect changes
    $scope.updateMarkerClasses = function(){
        $scope.markerClasses = "";

        $scope.markerClasses =
        (typeof $scope.markerShape  !== "undefined" ? $scope.markerShape : '')
        + ' ' +
        (typeof $scope.markerBackgroundColor  !== "undefined" ? $scope.markerBackgroundColor : '')
        + ' ' +
        (typeof $scope.markerIcon  !== "undefined" ? $scope.markerIcon : '')
        + ' ' +
        (typeof $scope.markerIconColor  !== "undefined" ? $scope.markerIconColor : '')
        + ' ' +
        (typeof $scope.markerSize  !== "undefined" ? $scope.markerSize : '');

        // Hide borders
        if($scope.hideBorder){
            $scope.markerClasses = $scope.markerClasses + " " + "wmm-borderless";
        }

        document.getElementsByClassName("leaflet-marker-icon")[0].className = "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive " + $scope.markerClasses;
    }



    // Map Setup
    // Map Setup
    // Map Setup
    var mymap = L.map('mapid').setView([43.092533,-89.5324482], 17);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '',
          maxZoom: 18,
      }).addTo(mymap);

      var myIcon = L.divIcon({className: 'wmm-pin wmm-red wmm-icon-circle wmm-icon-white wmm-size-25'});
      // you can set .my-div-icon styles in CSS
      L.marker([43.092533,-89.5324482], {icon: myIcon}).addTo(mymap);


      $scope.changeBaseMap = function(number){

        document.getElementsByClassName("selectBM")[0].classList.remove("active");
        document.getElementsByClassName("selectBM")[1].classList.remove("active");
        document.getElementsByClassName("selectBM")[2].classList.remove("active");

        if(number == 1){
          document.getElementsByClassName("selectBM")[0].classList.add("active");
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '',
              maxZoom: 18,
          }).addTo(mymap);
        }
        if(number == 2){
          document.getElementsByClassName("selectBM")[1].classList.add("active");
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
              attribution: '',
              maxZoom: 18,
          }).addTo(mymap);
        }
        if(number == 3){
          document.getElementsByClassName("selectBM")[2].classList.add("active");
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
              attribution: '',
              maxZoom: 18,
          }).addTo(mymap);
        }
      }



}]);
