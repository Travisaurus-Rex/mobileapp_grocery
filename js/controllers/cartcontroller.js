module.controller('CartController', ['$scope', '$rootScope', 'setListService', 'setItemService', function($scope, $rootScope, setListService, setItemService) {

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
	

}]);