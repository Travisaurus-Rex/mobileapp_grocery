module.service('itemtodeleteservice', function(){
	var item;

	function itemToDelete(itemToDelete) {
		item = itemToDelete;
	}

	function getItemToDelete() {
		return item;
	}

	return {
		itemToDelete     : itemToDelete,
		getItemToDelete  : getItemToDelete
	}
	
});