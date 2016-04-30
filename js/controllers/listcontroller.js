module.controller('ListController', ['$scope', 'ShoppingList', 'setListService', 'addToDbService', function($scope, ShoppingList, setListService, addToDbService){

	// GETS array of ShoppingLists
	$scope.allLists = setListService.allLists; 

	// when user clicks on a list, find it and set it as currentList
	$scope.openList = setListService.setList;

	/*
	$scope.newList = new ShoppingList();
	$scope.newList.changeName("list 2");
	$scope.newList.addItem("bacon");
	$scope.newList.addItem("moar bacon");
	$scope.add = addToDbService.addListToDB($scope.newList);
	*/
	

	$scope.createNewList = function() {
		var newList = new ShoppingList();
		$scope.allLists.push(newList);
		$scope.openList(newList, 'list.html');
	}

	$scope.saveList = function() {
		addListToDB(angular.toJson($scope.currentList));
	}
			
}]);