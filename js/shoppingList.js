/*
	This code is far from finished. This is a preliminary
	set of objects that will define the structure of the
	app and its functionality. 

	Once this code is logically perfected, it will be 
	converted to an angular factory and injected as a 
	dependency into the main controller of the application in main.js
*/


// SHOPPING LIST OBJECT

// takes no parameters, but requires a
// name property and an array of items

function ShoppingList() {
	this.name;
	this.items = [];
}

// SHOPPING LIST METHOD

// In the full app, each shopping list will have
// a generated name, such as "List 1" or "Shopping List 2"
// and so on. The number will be generated based on
// however many lists currently exist in the user's
// database. This method allows the user to change
// the name later.

ShoppingList.prototype.changeName = function(newName) {
	this.name = newName;
	console.log(this.name);
}

// SHOPPING LIST METHOD

// this method creates a new instance of the ListItem object,
// then pushes the new object into the shopping list's items array

ShoppingList.prototype.addItem = function(name) {
	var item = new ListItem(name);
	this.items.push(item);
	console.log(item);
}

// LIST ITEM OBJECT

// each list item must take in a name parameter
// whenever instantiated. Each list item will also
// have more properties, such as prices and importance
// ratings, but for this test a name property is only nececssary

function ListItem(name) {
	this.name = name;
}




// some testing code to make sure functionality works as expected

var myList = new ShoppingList();

myList.changeName("My Shopping List");
myList.addItem("chips");
myList.addItem("brown sugar");
myList.addItem("ketchup");

console.log(myList.items);