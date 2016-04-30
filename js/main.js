// onsen app
var module = ons.bootstrap('my-app', ['onsen']);






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
