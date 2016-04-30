module.service('setItemService', function(){
	var currentitem;

	var sItem,
		sPrice,
		sQuantity;

	function setItem(itemToSet) {
		currentitem = itemToSet;
	}

	function getItem() {
		return currentitem;

	}

	function setData(price, quantity) {
		sPrice    = price;
		sQuantity = quantity;
	}

	function getData() {
		return {
			currentitem : currentitem,
			price       : sPrice,
			quantity    : sQuantity
		}
	}

	return {
		setItem: setItem,
		getItem: getItem,
		setData: setData,
		getData: getData
	}
	
});