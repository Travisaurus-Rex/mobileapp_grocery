module.controller("ItemController", ["$scope", 'setListService', function($scope, setListService){

	$scope.currentList = setListService.getList();	
	$scope.clicked 	   = false;
	$scope.deleteList  = function (list) {
		console.log(list);
	}

	$scope.changeName = function () {
		$scope.clicked = true;
	}

	$scope.saveName = function(){
		if($scope.newName) {
			$scope.currentList.changeName($scope.newName);
			$scope.newName = "";
			$scope.clicked = !$scope.clicked;
		} else {
			$scope.clicked = !$scope.clicked;
		}
	}

	$scope.clearModel = function() {
		$scope.inputName = "";
	}

}]);
