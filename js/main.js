// onsen app
var module = ons.bootstrap('my-app', ['onsen']);





// *** CONTROLLERS *** //

// List Controller

module.controller('ListController', ['$scope', 'ShoppingList', 'setListService', function($scope, ShoppingList, setListService){

	// GETS array of ShoppingLists
	$scope.users_lists = setListService.allLists;  

	// when user clicks on a list, find it and set it as currentList
	$scope.openList = setListService.setList;

	$scope.createNewList = function() {
		var newList = new ShoppingList();
		$scope.users_lists.push(newList);
	}

	$scope.saveList = function() {
		addListToDB(angular.toJson($scope.currentList));
	}
			
}]);



// Item Controller

module.controller("ItemController", ["$scope", 'ShoppingList', 'ListItem', 'setListService', function($scope, ShoppingList, ListItem, setListService){

	$scope.currentList = setListService.getList();	

	$scope.clearModel = function() {
		$scope.inputName = "";
	}

}]);




// Shopping Controller

module.controller("ShoppingController", ['$scope', 'ShoppingList', 'ListItem', 'setListService', function($scope, ShoppingList, ListItem, setListService){

	$scope.allLists = setListService.allLists;


}]);






// *** FACTORIES *** //

// ------------------------------------------------------------------------

// *** SHOPPING LIST CLASS FACTORY *** //

module.factory('ShoppingList', function(){

	ShoppingList = function() {
		//this.id;
		this.itemCounter = 0;
		this.name        = "New List";
		this.items       = [];
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
	return ShoppingList;
});

// -------------------------------------------------------------------------
// *** LIST ITEM CLASS FACTORY*** //

module.factory('ListItem', function(){

	ListItem = function(name, id) {
		this.name   = name;
		this.id     = id;
		this.price  = null;
		this.rating = "staple";
	}

	// ADDS PRICE to the ListItem
	ListItem.prototype.addPrice = function(price) {
		var parsedPrice = parseFloat(price);
		this.price      = parsedPrice;
	}

	// CHANGE RATING of the item
	ListItem.prototype.changeRating = function(value) {
		this.rating = value;
	}

	return ListItem;
});






// *** SERVICES *** //
// -------------------------------------------------------------------------

module.service('addToDbService', function(){

	this.addListToDB = function(newList) {
		if(newList != null) {
			$.ajax({
			    url: "https://api.mongolab.com/api/1/databases/grocery_app/collections/shopping_lists?apiKey=wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG",
			    type: "POST",
			    data: newList,
			    contentType: "application/json",
			    success: function(res) {
			    	console.log(res);
			    },
			    error: function(err) {
			    	console.log(err);
			    }
			});
		}
		else {
			console.log("Nothing was added");
		}
	}
});




module.service('getFromDbService', function(){

	// REVIVES plain objects from the DB as new ShoppingLists and ListItems
	function reviver(list) {

		// REVIVE the list
		var revived = new ShoppingList();
		revived.changeName(list.name);
		revived.itemCounter = list.itemCounter;
		
		// REVIVE each list item
		var revivedItem;
		for(var i = 0; i < list.items.length; i++) {
			revivedItem        = new ListItem(list.items[i].name, list.items[i].id);
			revivedItem.price  = list.items[i].price;
			revivedItem.rating = list.items[i].rating;

			revived.items.push(revivedItem);	
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

});





module.service("setListService", ['getFromDbService', function(getFromDbService){
	var list;
	var allLists = getFromDbService.getShoppingLists();

	var setList = function(click){
		for(var i = 0; i < allLists.length; i++) {
			if(allLists[i].name == click.name) {
				list = allLists[i];
			}
		}
		// navigate to list page
		myNavigator.pushPage('list.html')
	}

	var getList = function(){
		return list;
	}

	return {
		allLists: allLists,
		setList: setList,
		getList: getList
	}
}]);




/* 
		The application needs global access to the budget,
		and because there must be only one budget at any
		time, it makes the most sense to use local storage
		instead of a database table.
	

	function setBudget(budget) {

		// if a budget variable has already been set, remove it

		if(localStorage.getItem("budget")) {
			localStorage.removeItem("budget");
		} 

		var parsedBudget = parseFloat(budget);
		localStorage.setItem("budget", parsedBudget);
	}

	function getBudget() {
		return localStorage.getItem("budget");
	}

*/
