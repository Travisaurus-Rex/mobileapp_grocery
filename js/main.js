// angular test

var app = angular.module("testApp", []);

app.controller('mainController', function($scope) {

	// create items array, and a method that pushes new items into it

	$scope.items = [];

	$scope.addToList = function(name) {
		if (!name) {
			// do nothing
		} else {
			$scope.items.push(name);
			$scope.name = "";
		}
	}
});