var app ={
  db:null,
  version:'1.0'
};

document.addEventListener("DOMContentLoaded", function(){
  //app has loaded
  //access / create the database
  checkDB();
  
  document.getElementById("btnAdd").addEventListener("click", addThing);
});

function output(msg){
  document.getElementById("output").innerHTML += "<br/>" + msg;
}

function checkDB(){
		app.db = openDatabase('sample', '2.0', 'Sample DB', 1024*1024);
    if(app.version == '1.0'){
        output('First time running... create tables'); 
        //means first time creation of DB
        //increment the version and create the tables
        app.db.changeVersion('1.0', '2.0',
                function(trans){
                    //something to do in addition to incrementing the value
                    //otherwise your new version will be an empty DB
                    output("DB version incremented");
                    //do the initial setup
          					//create some table(s)
          					//add stuff into table(s)
                    trans.executeSql('CREATE TABLE stuff(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', [], 
                                    function(tx, rs){
                                        //do something if it works
                                        output("Table stuff created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
                    trans.executeSql('INSERT INTO stuff(name) VALUES(?)', ["Cheese"], 
                                    function(tx, rs){
                                        //do something if it works, as desired   
                                        output("Added row in stuff");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
                },
                function(err){
                    //error in changing version
                    //if the increment fails
                    output( "Change version call error " + err.message);
                },
                function(){
                    //successfully completed the transaction of incrementing the version number   
          					output("Change version function worked.")
                });
    }else{
        //version should be 1.0
        //this won't be the first time running the app
        output("DB has previously been created");
        output('Version:' + app.version)   ;
    }
	  updateList();
}

function addThing(ev){
  ev.preventDefault();
  var txt = document.getElementById("txt").value;
  if(txt != ""){
    //save the value in the stuff table
    app.db.transaction(function(trans){
    	trans.executeSql('INSERT INTO stuff(name) VALUES(?)', [txt], 
                                    function(tx, rs){
                                        //do something if it works, as desired   
                                        output("Added row in stuff");
																	      updateList();
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
    },
    function(){
      //error for the transaction
      output("The insert sql transaction failed.")
    },
    function(){
      //success for the transation
      //this function is optional
    });
  }else{
    output("Text field is empty");
  }
}

function updateList(){
  var list = document.getElementById("list");
  list.innerHTML = "";
  //clear out the list before displaying everything
  app.db.transaction(function(trans){
    trans.executeSql("SELECT * FROM stuff", [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
          li.innerHTML = rs.rows.item(i).name;
          list.appendChild(li);
        }
      output("displayed the current contents of the stuff table")
    	}, 
      function(tx, err){
      	//error
      	output("transaction to list contents of stuff failed")
    });
  });
}