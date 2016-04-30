module.service("setListService", ['getFromDbService', function(getFromDbService){
	var list;
	var allLists = getFromDbService.getShoppingLists();

	var setList = function(click, location){
		for(var i = 0; i < allLists.length; i++) {
			if(allLists[i].name == click.name) {
				list = allLists[i];
			}
		}
	
		// if location requested is list.html, use itemsnav navigator
		if(location == 'list.html') {
			itemsnav.pushPage(location)
		} else {
			// else, use the cartnav navigator
			cartnav.pushPage(location);
		}
		
	}

	var getList = function(){
		return list;
	}

	return {
		allLists : allLists,
		setList  : setList,
		getList  : getList
	} 
}]);