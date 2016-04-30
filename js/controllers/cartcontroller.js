module.controller('CartController', ['$scope', '$rootScope', 'setListService', 'setItemService', 'itemtodeleteservice', function($scope, $rootScope, setListService, setItemService, itemtodeleteservice) {

	$scope.currentList = setListService.getList();
	$scope.setItem = setItemService.setItem;

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

	$scope.callGet = function(item) {
			$scope.setItem(item);
            $rootScope.$emit("getThisItem", {});
            $scope.show('removefromcart.html');
    }

     $rootScope.$on("deleteFromCart", function(){
     	$scope.itemToDelete = itemtodeleteservice.getItemToDelete();
    	$scope.currentList.deleteFromCart($scope.itemToDelete.id);
    });
	

}]);
