/*
	This code is far from finished. This is a preliminary
	set of objects that will define the structure of the
	app and its functionality. 

	Once this code is logically perfected, it will be 
	converted to an angular factory and injected as a 
	dependency into the main controller of the application in main.js

	mLAB api link = https://api.mlab.com/api/1/databases/grocery_app/collections/shopping_lists?apiKey=wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG

	API key: wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG
*/

// -------------------------------------------------------------------------
// SHOPPING LIST OBJECT

function ShoppingList() {
	this.id;
	this.name;
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
	this.name = name;
	this.price;
	this.rating;
}

// adds a price to the ListItem

ListItem.prototype.addPrice = function(price) {
	var parsedPrice = parseFloat(price);
	this.price = parsedPrice;
}

// -------------------------------------------------------------------------
// functions for creating instances of shopping lists and adding them to the database

function createShoppingList() {
	var list = new ShoppingList();
	return list;
}

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
// some testing code to make sure functionality works as expected

/*
var myList = createShoppingList();
myList.addItem("party whistle");
myList.items[0].addPrice("0.99");
myList.changeName("new test list 3");

console.log(typeof myList);
addListToDB(myList);

getShoppingLists();

setBudget("25.00");
console.log(localStorage.getItem("budget"));
*/