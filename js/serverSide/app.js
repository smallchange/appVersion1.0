//if json doesn't work
//var tableName;
//var tables = [];
//var maxTables = 2;
//var playerDetails = [];

var app = {
    ip: "http://10.70.161.207:8888",
    dbhost: "http://10.70.161.207:8889",
    name: "smallChangeDb",
    db: openDatabase("smallChangeDb", '1.0', 'United Way - Small Change', 1024 * 1024),
}

// use functions to have interactions based on time and date
var calender = {
    setToday: function () {
        // Sets a value for the current day and time 
        // These will be used to determine how much time is left to reach a goal 
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1;
        var yyyy = currentDate.getFullYear();
        //yyyy is year, mm is month, dd is day
        currentDate = yyyy + "-" + mm + "-" + dd;
        calender.time = currentTime;
        calender.date = currentDate;
    },
    // current time (used to calculate the amount of time left to reach a financial goal)
    time: function () {},
    // current date (used to calculate the amount of time left to reach a financial goal)
    date: function () {}
}

// use functions to get information from dom
var valuesFromDom = {
    //pull stuff from here
    addtogoal: function () {
        document.querySelector("[data-role=overlay]").style.display = "none";
        ev.preventDefault();
        document.querySelector("#datebox").innerHTML = "";

        var deadlineBtn = document.createElement("input");
        deadlineBtn.value = "Deadline";
        deadlineBtn.type = "button";
        deadlineBtn.id = "deadline";

        var deadlinevalue = new Date(document.querySelector("#goaldate").value);
        var dd = deadlinevalue.getDate() + 1;
        var mm = deadlinevalue.getMonth() + 1;
        var yyyy = deadlinevalue.getFullYear();

        goal.deadline = yyyy + "-" + mm + "-" + dd;
        var difference = Math.abs(deadlinevalue.getTime() - app.time); // subtract the difference: the value of user input - current date time
        var countDays = Math.floor(difference / (1000 * 3600 * 24));
        // get the lower number of how many days are left 
        goal.timeleft = countDays; // add the days left to the global value goal.daysleft 


        var deadLine = document.createElement("p");
        var currentDate = document.createElement("p");
        var timeLeft = document.createElement("p");
        deadLine.innerHTML = goal.deadline;

        deadLine.innerHTML = "Deadline : " + goal.deadline;

        timeLeft.innerHTML = "Days left to reach goal: " + goal.timeleft;

        document.querySelector("#deadlinepage").style.display = "none";

        document.querySelector("#datebox").appendChild(deadlineBtn);
        document.querySelector("#datebox").appendChild(deadLine);
        document.querySelector("#datebox").appendChild(currentDate);
        document.querySelector("#datebox").appendChild(timeLeft);
    },
    getInput: function (nameOfInput) {
        var value = $.trim(document.getElementById(nameOfInput).value);
        return value;
    },
    getDate: function () {}
}

// use functions to interact with SQLite tables
var serverActions = {
    createTables: function (tableName) {
        var sql;
        if (tableName == "profile") {
            sql = 'CREATE TABLE profile (person_id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT(50), lastName TEXT(50), ageRange TEXT, email TEXT, psw TEXT, userLvl INTEGER, deadline TEXT, goalPrice INTEGER, goalName TEXT(255));';
            //t is still union, r is inserted stuff
            app.db.transaction(function (trans) {
                trans.executeSql(sql, [], function (t, r) {
                        output("Profile table create successfully");
                    },
                    function (t, e) {
                        //alert(e.message);
                        output(e.message);
                    }
                );
            });
        };

        if (tableName == "challenges") {
            sql = 'CREATE TABLE ' + tableName + ' (challenge_id INTEGER PRIMARY KEY, challenge_en TEXT(50), challenge_fr TEXT(100), price INTEGER);';

            /*
			app.db.transaction(function (trans) {
                trans.executeSql(sql, [],
                    function (t, r) {
                        //do something if it works
                        output("Table stuff created");
                        //storeTable(tableName); // adds a field in local storage to tell you the tables have been created
                    },
                    function (t, e) {
                        output(e.message);
                    }
                );
            });
			*/

        };

        if (tableName == "savingsTimeline") {}
    },
    dropTable: function (tableName) {
        app.db.transaction(function (trans) {
            //DROP TABLE [ IF EXISTS ] tableName;
            sql = "DROP TABLE IF EXISTS " + tableName;
            trans.executeSql(sql, [],
                function (t, r) {
                    //do something if it works
                    alert("Delete Worked"); // adds a field in local storage to tell you the tables have been created
                },
                function (t, e) {
                    alert(e.message);
                }
            );
        });
    },
    loadChallenges: function () {
        sql = 'SELECT challenge_en, agerange, deadline, goalprice, goalname FROM challenges';
        document.querySelector("#playerchallenges").style.display = "block";
        transaction.executeSql(sql, [],
            function (t, challenges) {
                var rowCount = challenges.rows.item(0).countrows;
                document.querySelector("#playerchallenges").innerHTML = "";
                for (var i = 0; i < rowCount; i++) {
                    var p = document.createElement("p");
                    p.innerHTML = activities.rows[i].challenge_en;
                    document.querySelector("#playerchallenges").appendChild(p);
                }
            });
    }
};
var userActions = {
    //get info from Input from userSignUp page
    insertProfileInfo: function () {
        var sql = "INSERT INTO profile(firstName, lastName, ageRange, email, psw, userLvl) VALUES('" + valuesFromDom.getInput("firstName") + "', '" + valuesFromDom.getInput("lastName") + "', '" + $('#signUpForm option:selected').attr('value') + "', '" + valuesFromDom.getInput("email") + "', '" + valuesFromDom.getInput("psw") + "', 0)";
        app.db.transaction(function (trans) {
            trans.executeSql(sql, [],
                function (tx, rs) {
                    output("inserted some stuff");
                },
                function (tx, err) {
                    //failed to run query
                    output(err.message);
                });
            return sql;
        });
    },

    //get info from Input from savingsGoal page
    insertProfileGoal: function () {

        var temp_deadline = '2020-01-01'; // TEMP DEADLINE UNTIL THIS PART IS FIXED
        var sql = "UPDATE profile SET goalName='" + valuesFromDom.getInput("goalName") + "',goalPrice=" + getFromForm("goalPrice") + ",deadline='" + temp_deadline + "' WHERE person_id = " + user.id;
        console.log(sql);
        //var sql = "INSERT INTO profile(goalName, goalPrice, deadline) VALUES('" + getFromForm("goalName") + "', '" + getFromForm("goalPrice") + "', '" + getFromForm("deadline") + "')";
        app.db.transaction(function (trans) {
            trans.executeSql(sql, [],
                function (tx, rs) {
                    output("Added your goals and a deadline");
                },
                function (tx, err) {
                    //failed to run query
                    output(err.message);
                });
            return sql;
        });
    },
    updateProfile: function () {

    },
}

// use functions to validate information
var stringGood = false;
var isValid;
var validate = {
    //is user a guest
    isUserGuest: function () {},

    // use to check if a new version of app is out
    versionNumber: function () {},

    // use to check if profile exists
    checkProfile: function () {
        if (localStorage.getItem("player-tablelog")) {
            tables = JSON.parse(localStorage.getItem("player-tablelog")); //convert from String to Array
            user.profileexists = true;

            localStorage.setItem("player-info", playerDetails);
            for (var i = 0; i < tables.length; i++) {
                if (tables[i].displayName == "challenges")
                    goal.dataExists = true;
            }

            if (!goal.dataExists) {
                // load a webpage with the player's challenges
                // loadChallenges(); 
            } else {
                // create the challenges table 
                createTables("challenges");
                // load a webpage with all activities 
                // load a webpage with all activities 

                var path = "js/activities.json";
                // parse the available activities and display them to the person 
                // sendRequest(path, getActivities, "GET"); 
                // listen on activities for clicks to add items 
            }
        } else {
            // load the sign-up page
            // After the information is submitted, create the profile table with the needed information 

            createTables("profile");
            // Listen for an event on the submit button 
            // When the submit button is clicked, go to the goal page 
            // When the goal information is saved, go to the activities page and load all activities
        }
    },

    //used to check if users challenges
    challengesCreated: function () {},

    //use to check infromation from form inputs
    isFormEmpty: function () {},
    compareStrings: function (field1, field2) {
        field1 = field1.trim();
        field2 = field2.trim();
        if (field1 == field2)
            isValid = true;
        else
            isValid = false;

        // Check the length of field if both match
        if (isValid) {
            var minLength = 5;
            validate.checkMinLength(field1, minLength);
            alert("is valid is " + isValid);
        }
    },
    checkMinLength: function (input, minLength) {
        // This will be used to check names
        // for names: minimum of 2 characters 

        if (input.length >= minLength)
            stringGood = isValid = true;
        else
            stringGood = isValid = false;
    },
    checkLength: function (input, minLength, maxLength) {
        // Use this to set a restriction on the maximum number of characters 
        // This will be used to check passwords 
        if (input.length >= minLength && input.length <= maxLength)
            stringGood = isValid = true;
        else
            stringGood = isValid = false;
    },
    checkEmail: function (email) {
        // api http://blog.mailgun.com/free-email-validation-api-for-web-forms/
    }
}

// use functions for mathematical algorithms 
var algorithm = {
    //used to check if goal monetary value has been reached
    chkIfGoalReached: function () {
        goal.curtotal = 0;
        goal.calculate = goal.price - goal.curtotal;
    }
}

function output(msg) {
    console.log(msg);
}

function getActivities(xhr) {

        // if the xhr status is good...
        if (xhr.readyState == 4 && xhr.status == 200) {

            var challenges = xhr.responseText;
            var challengeText = JSON.parse(xhr.responseText);
            //add player information
            challengeText.activities.length;

            var activities = {};
            for (var i = 0; i < challengeText.activities.length; i++) {
                // Output all possible activities to the user 
                activities[i].id = challengeText.activities[i].id;
                activities[i].en_desc = challengeText.activities[i].en_desc;
                activities[i].fr_desc = challengeText.activities[i].fr_desc;

            }

            // Listen for events on the activities items 
            // When an activity is clicked, add to localStorage that challenges are set 
            // Local storage will be used to determine whether challenge or profile tables should be created
            // createTables("challenges"); 
            // When an activity is clicked, add it to the challenges table! 

        }
    }

// Call this function on click events to add new challenges 
function insertChallenges(ev) {
        var challengeId = ev.target.getAttribute("data-ref-id");
        var challengeName = ev.target.innerHTML;

        var sql = "INSERT INTO challenges(challenge_id, challenge_en) VALUES('" + challengeId + "', '" + challengeName + "')";
        transaction.executeSql(sql, [],
            function (t, challenges) {
                output("inserted some stuff");
            });
    }

/*
    var leanPlum = {
    	init: function(){
    	// research on how to write data to JSON FILE 
    	
    	alert("it works"); 
    	// This value should be set to true only if you're developing on your server.
    	var isDevelopmentMode = true;
    	// Sample variables. This can be any JSON object.
    	var variables = {
    		items: {
    			color: 'red',
    			size: 20,
    			showBadges: true
    		},
    		showAds: true
    		};
     

    	// We've inserted your Small Change API keys here for you :)
    	if (isDevelopmentMode) {
    		Leanplum.setAppIdForDevelopmentMode("app_D74zpdfYX292l6A7Sh29wa7KZjtfzoR3rZhmlIHP0UE", "dev_UKDZVbEbE8kKutg8WRTlwfacwuXhzW0baEk0M2IxVSs");
    		} else {
    			Leanplum.setAppIdForProductionMode("app_D74zpdfYX292l6A7Sh29wa7KZjtfzoR3rZhmlIHP0UE", "prod_dWvVUuRF5JqJiSpR7rtBC5Cn2rMRgKpwegJKggL3YOU");
    		}
    		
    		Leanplum.setVariables(variables);
    		Leanplum.start(function(success) {
    			console.log('Success: ' + success);
    			console.log('Variables', Leanplum.getVariables());
    		});	
    	},
    	pushMsg: function(){
    		Leanplum.setVariables({
    			StoreTitle: "Powerup Store",
    			Items: [{
    				name: "Speed Boost",
    				price: 100
    				}, {
    					name: "Health Boost",
    					price: 150
    				}
    			]
    		});
    	},
    	userSession: function(id){
    	id = user.id; 
    	Leanplum.start(user.id);
    	// Start with user ID and attributes.
    	Leanplum.start(id, {'language': user.language}, {'email': user.email});	
    	}
    }*/