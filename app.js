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
  $scope.markerClasses = " wmm-pin wmm-red wmm-icon-circle wmm-icon-white wmm-size-25";
  $scope.markerShape = "wmm-pin";
  $scope.markerBackgroundColor = "wmm-red";
  $scope.markerIcon = "wmm-icon-circle";
  $scope.markerSize = "wmm-size-25";
  $scope.markerIconColor = "wmm-icon-white";


  // Select Marker Background
  // Select Marker Background
  // Select Marker Background
  $scope.changeMarkerShape = function(shape, position){
    $scope.markerShape = "wmm-" + shape;
    $scope.updateMarkerClasses();

    // Active class for selected button
    var markerShapeButtons = document.getElementsByClassName("selectMarkerShape");
    for(var i = 0; i < markerShapeButtons.length; i++){
      document.getElementsByClassName("selectMarkerShape")[i].classList.remove("active");
    }
    document.getElementsByClassName("selectMarkerShape")[position].classList.add("active");
  }


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
    $scope.markerIcon = "wmm-icon-" + icon;
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


  // Change Marker Size
  // Change Marker Size
  // Change Marker Size
  $scope.changeMarkerSize = function(iconSize, position){
    $scope.markerSize = "wmm-size-" + iconSize;
    $scope.updateMarkerClasses();

    // Active class for selected button
    var markerSizeButtons = document.getElementsByClassName("selectMarkerSize");
    for(var i = 0; i < markerSizeButtons.length; i++){
      document.getElementsByClassName("selectMarkerSize")[i].classList.remove("active");
    }
    document.getElementsByClassName("selectMarkerSize")[position].classList.add("active");
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

      document.getElementsByClassName("leaflet-marker-icon")[0].className = "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive " + $scope.markerClasses;
  }

});
