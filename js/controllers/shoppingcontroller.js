module.controller("ShoppingController", ['$scope', 'setListService', 'setItemService', '$rootScope', function($scope, setListService, setItemService, $rootScope){

	$scope.allLists = setListService.allLists;
	$scope.currentList;
	$scope.incomingData;

	$scope.setList = setListService.setList;

	if($scope.allLists.length == 1) {
		$scope.currentList = $scope.allLists[0];
	}

	$scope.setShoppingList = function(list){
		for(var i = 0; i < $scope.allLists.length; i++) {
			if($scope.allLists[i].name == list.name) {
				$scope.currentList = $scope.allLists[i];
			}
		}
	}

	$scope.dialogs = {};
	$scope.show = function(dlg) {
	    if (!$scope.dialogs[dlg]) {
	      ons.createDialog(dlg).then(function(dialog) {
	        $scope.dialogs[dlg] = dialog;
	        dialog.show();
	      });
	    } else {
	      $scope.dialogs[dlg].show();
	    }

	}



	$scope.setItem = setItemService.setItem;

	$rootScope.$on("CallCalc", function(){
           $scope.calculate();
           $scope.dialog.hide()
    });

    $scope.calculate = function() {
        $scope.incomingData = setItemService.getData();
        $scope.currentList.addToCart($scope.incomingData.currentitem, $scope.incomingData.price, $scope.incomingData.quantity);
            //console.log($scope.currentList.cart);
    }





}]);