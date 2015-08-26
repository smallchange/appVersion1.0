// JavaScript Document
// create a local storage file which tells you which tables have been created 
// at the beginning of the app there will be a check for which table items have been created
var count = 0; 
function storeTable(tableName){

var li;
	if (count < maxTables)
	{
		tables.push({id : count, displayName : tableName});
		count++;
	}

localStorage.setItem("player-tablelog", tables); // send array values to localStorage
}



