module.service('getFromDbService', ['ShoppingList', 'ListItem', function(ShoppingList, ListItem){

	// REVIVES plain objects from the DB as new ShoppingLists and ListItems
	function reviver(list) {

		// REVIVE the list
		var revived = new ShoppingList();
		revived.changeName(list.name);

		revived.itemCounter = list.itemCounter;
		revived.total       = list.total;
		
		// REVIVE each ListItem in the items array
		for(var i = 0; i < list.items.length; i++) {
			var revivedItem;
			revivedItem          = new ListItem(list.items[i].name, list.items[i].id);
			revivedItem.rating   = list.items[i].rating;

			revived.items.push(revivedItem);	
		}
		
		// REVIVE each ListItem in the cart array
		for(var i = 0; i < list.cart.length; i++) {
			var revivedItem;

			revivedItem          = new ListItem(list.cart[i].name, list.cart[i].id);
			revivedItem.rating   = list.cart[i].rating;
			revivedItem.price    = list.cart[i].price;
			revivedItem.quantity = list.cart[i].quantity;

			revived.cart.push(revivedItem);
		}
		
		
		
		return revived;
	}

	this.getShoppingLists = function() {
		var newLists = [];
		$.ajax({
			url: "https://api.mongolab.com/api/1/databases/grocery_app/collections/shopping_lists?apiKey=wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG",
			datatype: "application/json",
			async: false,
			success: function(data) {
				for(var i = 0; i < data.length; i++) {
					newLists.push(reviver(data[i]));
				}
			}
		});
		
		return newLists;		
	}

}]);