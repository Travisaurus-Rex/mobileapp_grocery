/*
	All the OOP goodness is stored here!

	CLASSES: ShoppingList, ListItem

	mLAB api link = https://api.mlab.com/api/1/databases/grocery_app/collections/shopping_lists?apiKey=wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG

	API key: wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG
*/



// -------------------------------------------------------------------------
// SHOPPING LIST OBJECT

function ShoppingList() {
	this.id    = null;
	this.name  = null;
	this.items = [];
}

// lets the user change the name property of a shopping list

ShoppingList.prototype.changeName = function(newName) {
	this.name = newName;
}

// creates a ListItem instance, then pushes it into the ShoppingList's items array

ShoppingList.prototype.addItem = function(name) {
	var item = new ListItem(name);
	this.items.push(item);
}

// -------------------------------------------------------------------------
// LIST ITEM OBJECT

function ListItem(name) {
	this.name   = name;
	this.price  = null;
	this.rating = "staple";
}

// adds a price to the ListItem

ListItem.prototype.addPrice = function(price) {
	var parsedPrice = parseFloat(price);
	this.price      = parsedPrice;
}

ListItem.prototype.changeRating = function(value) {
	this.rating = value;
}

// -------------------------------------------------------------------------
// functions for creating instances of shopping lists and adding them to the database

function addListToDB(newList) {
	if((newList != null) && (typeof newList == "object")) {
		$.ajax({
		    url: "https://api.mongolab.com/api/1/databases/grocery_app/collections/shopping_lists?apiKey=wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG",
		    type: "POST",
		    data: JSON.stringify(newList),
		    contentType: "application/json"
		});
	}
	else {
		console.log("Cannot add following type as list: " + typeof newList);
	}
}

function getShoppingLists() {
	$.ajax({
		url: "https://api.mongolab.com/api/1/databases/grocery_app/collections/shopping_lists?apiKey=wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG",
		datatype: "json",
		success: function(data) {
			console.log(data);
		}
	});
}

/* 
	budget should be a global variable, and since it's just a key/value pair, 
	storing via local storage makes the most sense! Also works in PhoneGap!
*/

function setBudget(budget) {
	var parsedBudget = parseFloat(budget);

	// if a budget variable has already been set, remove it
	if(localStorage.getItem("budget")) {
		localStorage.removeItem("budget");
	} 
	
	localStorage.setItem("budget", parsedBudget);
}

// ------------------------------------------------------------------------
