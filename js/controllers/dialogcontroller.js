module.controller("DialogController", ['$scope', '$rootScope', 'setListService', 'setItemService', 'itemtodeleteservice', function($scope, $rootScope, setListService, setItemService, itemtodeleteservice){

	$rootScope.$on("getThisItem", function(){
		$scope.item        = setItemService.getItem();
		$scope.maxQuantity = $scope.item.quantity;
		$scope.quantityRmv = $scope.item.quantity;
	});
	$scope.itemToDelete = itemtodeleteservice.itemToDelete;
	$scope.item         = setItemService.getItem();
	$scope.maxQuantity  = $scope.item.quantity;
	$scope.quantityRmv  = $scope.item.quantity;
	$scope.setData      = setItemService.setData;
	$scope.currentList  = setListService.getList();
	$scope.quantity     = 1;
	$scope.placeHolder  = "Price";

	$scope.checkData = function(price, quantity) {
		var parsed = parseFloat(price);
		if(!isNaN(parsed)){
			$scope.setData(parsed, quantity);
			$scope.clearModel(); 
			$scope.callCalc(); 
			
		} else {
			$scope.placeHolder = "You must add a valid price";
			$("#price_input").addClass("warning");
			$scope.price = "";
		}
	}

	$scope.increaseQuantity = function(){
		$scope.quantity++;
	}
	$scope.decreaseQuantity = function(){
		if($scope.quantity > 1) {
			$scope.quantity--;
		}

	}

	$scope.itemQuantityIncrease = function() {
		if ($scope.quantityRmv < $scope.maxQuantity) {
			$scope.quantityRmv++;
		}
	}

	$scope.itemQuantityDecrease = function() {
		if ($scope.quantityRmv > 1) {
			$scope.quantityRmv--;
		}
	}

	$scope.clearModel = function() {
		$scope.price       = "";
		$("#price_input").removeClass("warning");
		$scope.quantity    = 1;
		$scope.placeHolder = "Price";
		$
	}

	$scope.callCalc = function() {
            $rootScope.$emit("CallCalc", {});
    }

    $scope.removeFromCart = function() {
    	$scope.difference         = $scope.maxQuantity - $scope.quantityRmv;
    	$scope.priceToSubtract    = $scope.item.price  * $scope.quantityRmv;
    	$scope.currentList.total -= $scope.priceToSubtract;
    	$scope.item.quantity      = $scope.difference;
    	if ($scope.item.quantity == 0) {
    		// remove this item from the cart array (from inside cart controller)
    		$scope.itemToDelete($scope.item);
    		$rootScope.$emit("deleteFromCart", {});
    	}
    	retard.hide();
    }

}]);
