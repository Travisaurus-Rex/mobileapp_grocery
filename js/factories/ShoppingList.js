module.factory('ShoppingList', ['ListItem', function(ListItem){

	ShoppingList = function() {
		//this.id;
		this.itemCounter = 0;
		this.name        = "New List";
		this.items       = [];
		this.cart        = [];
		this.total       = 0.0;
	}

	// CHANGE the name property of a shopping list
	ShoppingList.prototype.changeName = function(newName) {
		this.name = newName;
	}

	// ADD item to the list
	ShoppingList.prototype.addItem = function(name) {
		if(!name) {
			console.log("You must enter an item!");
		} else {
			// ITERATE the item counter
			this.itemCounter++;
			// pass in the name, itemCounter (used as unique id for the item)
			var item = new ListItem(name, this.itemCounter);
			// add the item to the items array
			this.items.push(item);			
		}
	}

	// DELETE an item from the list
	ShoppingList.prototype.deleteItem = function(id) {
		// find the item in the list that matches the id, delete it
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i].id == id) {
				this.items.splice(i, 1);
			}
		}	
	}

	// ADD item to the shopping cart
	ShoppingList.prototype.addToCart = function(itemToAdd, price, quantity){
		var item;
		// find the selected item in the items array
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i].id == itemToAdd.id) {
				item = this.items[i];
			}
		}
		// add a price to the item
		item.addPrice(price);
		// set quantity of item
		item.setQuantity(quantity);
		// increment the total price of the cart
		this.total   += (item.price * item.quantity);
		// add the item to the cart array
		this.cart.push(item);
		// remove the item from the items array
		this.deleteItem(itemToAdd.id)
		
	}

	return ShoppingList;
}]);