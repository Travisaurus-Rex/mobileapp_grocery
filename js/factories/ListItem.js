module.factory('ListItem', function(){

	ListItem = function(name, id) {
		this.name     = name;
		this.id       = id;
		this.price    = 0.0;
		this.quantity = 0;
		this.rating   = "staple";
	}

	// ADDS PRICE to the ListItem
	ListItem.prototype.addPrice = function(price) {
		var parsedPrice = parseFloat(price);
		if(isNaN(parsedPrice)) {
			console.log("You must add a number value!");
		} else {
			this.price      = parsedPrice;
		}
		
	}

	ListItem.prototype.setQuantity = function(quantity) {
		var parsedQuantity = parseInt(quantity);
		this.quantity = parsedQuantity;
	}

	// CHANGE RATING of the item
	ListItem.prototype.changeRating = function(value) {
		this.rating = value;
	}

	return ListItem;
});
