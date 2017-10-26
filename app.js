var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'pages/creator.html',
        controller  : 'creatorController'
    })
    // .when('/other', {
    //     templateUrl : 'pages/other.html',
    //     controller  : 'otherController'
    // })
    .otherwise({
        redirectTo: "/"
    });

});

app.controller('creatorController', function($scope) {

  // Variable Setup
  // Variable Setup
  // Variable Setup
  $scope.markerClasses = "wmm-red wmm-circle wmm-icon-white";
  $scope.markerBackgroundColor = "wmm-red";
  $scope.markerIcon = "wmm-circle";
  $scope.markerIconColor = "wmm-icon-white";


  // Select Marker Background
  // Select Marker Background
  // Select Marker Background
  $scope.changeMarkerBackground = function(color, position){
    $scope.markerBackgroundColor = "wmm-" + color;
    $scope.updateMarkerClasses();

    // Active class for selected button
    var markerColorButtons = document.getElementsByClassName("selectMarkerBackground");
    for(var i = 0; i < markerColorButtons.length; i++){
      document.getElementsByClassName("selectMarkerBackground")[i].classList.remove("active");
    }
    document.getElementsByClassName("selectMarkerBackground")[position].classList.add("active");
  }

  // Select Marker Icon
  // Select Marker Icon
  // Select Marker Icon
  $scope.changeMarkerIcon = function(icon, position){
    $scope.markerIcon = "wmm-" + icon;
    $scope.updateMarkerClasses();

    // Active class for selected button
    var markerColorButtons = document.getElementsByClassName("selectMarkerIcon");
    for(var i = 0; i < markerColorButtons.length; i++){
      document.getElementsByClassName("selectMarkerIcon")[i].classList.remove("active");
    }
    document.getElementsByClassName("selectMarkerIcon")[position].classList.add("active");
  }

  // Change Marker Icon Color
  // Change Marker Icon Color
  // Change Marker Icon Color
  $scope.changeMarkerIconColor = function(iconColor, position){
    $scope.markerIconColor = "wmm-icon-" + iconColor;
    $scope.updateMarkerClasses();

    // Active class for selected button
    var markerColorButtons = document.getElementsByClassName("selectMarkerIconColor");
    for(var i = 0; i < markerColorButtons.length; i++){
      document.getElementsByClassName("selectMarkerIconColor")[i].classList.remove("active");
    }
    document.getElementsByClassName("selectMarkerIconColor")[position].classList.add("active");
  }


  // Update Marker Classes to reflect changes
  // Update Marker Classes to reflect changes
  // Update Marker Classes to reflect changes
  $scope.updateMarkerClasses = function(){
      $scope.markerClasses = "";

      $scope.markerClasses =
        (typeof $scope.markerBackgroundColor  !== "undefined" ? $scope.markerBackgroundColor : '')
        + ' ' +
        (typeof $scope.markerIcon  !== "undefined" ? $scope.markerIcon : '')
        + ' ' +
        (typeof $scope.markerIconColor  !== "undefined" ? $scope.markerIconColor : '');

      document.getElementsByClassName("leaflet-marker-icon")[0].className = "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive wim-map-marker " + $scope.markerClasses;
  }

});
