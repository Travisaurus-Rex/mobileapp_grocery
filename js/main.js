// onsen app
var module = ons.bootstrap('my-app', ['onsen']);

    module.controller('AppController', function($scope) {});

    module.controller('PageController', function($scope) {
        ons.ready(function() {

          	// delicious angular/onsen-fused code goes here

			$scope.items = [];

			$scope.addToList = function(name) {
				if (!name) {
					console.log("You must enter an item!");
				} else {
					var item = new ListItem(name);
					$scope.items.push(item);
					$scope.name = "";
				}
			}

			$scope.myList = new ShoppingList();

			$scope.myList.changeName("My Shopping List");

			$scope.myList.addItem("chips");
			$scope.myList.items[0].addPrice("1.49")

			console.log($scope.myList);
	
	
        });
 	});
