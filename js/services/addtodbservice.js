module.service('addToDbService', function(){

	this.addListToDB = function(newList) {
		if(newList != null) {
			$.ajax({
			    url: "https://api.mongolab.com/api/1/databases/grocery_app/collections/shopping_lists?apiKey=wgTRmRzbddc_Up0rVf3WX3SBIQN81cOG",
			    type: "POST",
			    data: JSON.stringify(newList),
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