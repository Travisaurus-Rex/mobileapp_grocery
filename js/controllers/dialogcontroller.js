module.controller("DialogController", ['$scope', '$rootScope', 'setListService', 'setItemService', function($scope, $rootScope, setListService, setItemService){

	$rootScope.$on("getThisItem", function(){
		$scope.item        = setItemService.getItem();
		$scope.maxQuantity = $scope.item.quantity;
		console.log($scope.item.name);
	});

	$scope.item        = setItemService.getItem();
	$scope.maxQuantity = $scope.item.quantity;
	$scope.setData     = setItemService.setData;
	$scope.currentList = setListService.getList();
	$scope.quantity    = 1;
	$scope.placeHolder = "Price";

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
		if ($scope.item.quantity < $scope.maxQuantity) {
			$scope.item.quantity++;
		}
	}

	$scope.itemQuantityDecrease = function() {
		if ($scope.item.quantity > 1) {
			$scope.item.quantity--;
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
    	$scope.difference         = $scope.maxQuantity - $scope.item.quantity;
    	$scope.priceToSubtract    = $scope.item.price  * $scope.item.quantity;
    	$scope.currentList.total -= $scope.priceToSubtract;
    	$scope.item.quantity      = $scope.difference;
    	retard.hide();
    }

}]);