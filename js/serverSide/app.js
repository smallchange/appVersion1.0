// to redirect: window.location.href ="your link"; 
// 
var tableName;
var tables = [];
var maxTables = 2;

var playerDetails = [];

var app = {
    ip: "http://10.70.161.207:8888",
    dbhost: "http://10.70.161.207:8889",
    name: "smallChangeDb",
    version: "1.0.0",
    showName: "United Way - Small Change",
    time: "", // current time (used to calculate the amount of time left to reach a financial goal) 
    date: "", // current date (used to calculate the amount of time left to reach a financial goal)
    db: openDatabase("smallChangeDb", '1.0', 'United Way - Small Change', 1024 * 1024),

    initialize: function () {
        app.setToday(); // sets today's date
        document.addEventListener("DOMContentLoaded", app.checkDetails);
        document.addEventListener('deviceready', app.checkDetails, false);
    },
    setToday: function () {
        // Sets a value for the current day and time 
        // These will be used to determine how much time is left to reach a goal 
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1;
        var yyyy = currentDate.getFullYear();
        currentDate = yyyy + "-" + mm + "-" + dd;
        app.time = currentTime;
        app.date = currentDate;
    },
    checkDetails: function () {},
    checkProfile: function () {
        // Check if there is a local storage item 
        // If there is nothing in local storage, display the sign-up page 
        // Check if the profile table exists 
        // if the profile table exists, check if the challenges table exists 
        // if the challenge table doesn't exist, send the user to the page that shows all activities 
        // if the challenges table exists, display the player's challenges 
        // if the profile table doesn't exist, display the sign-up webpage 
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
    }
}

function loadChallenges() {

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

// use this to create tables
var SQLite = {

    createTables: function (tableName) {

        var sql;
        if (tableName == "profile") {
            sql = 'CREATE TABLE profile (person_id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT(50), lastName TEXT(50), ageRange TEXT, email TEXT, psw TEXT, deadline TEXT, goalPrice INTEGER, goalName TEXT(255));';
            //t is still union, r is inserted stuff
            app.db.transaction(function (trans) {
                trans.executeSql(sql, [], function (t, r) {
                        //alert('working');

                        //do something if it works
                        //output("Table stuff created");
                        //storeTable(tableName); // adds a field in local storage to tell you the tables have been created
                    },
                    function (t, e) {
                        //alert(e.message);
                        //output(e.message);
                    }
                );
            });
        };

        if (tableName == "challenges") {
            sql = 'CREATE TABLE ' + tableName + ' (challenge_id INTEGER PRIMARY KEY, challenge_en TEXT(50), challenge_fr TEXT(100), price INTEGER);';
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
        }
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
    }
};

// Global values for the user - they may be useful in different parts of the app 
var user = {
    id: 0,
    name: "",
    email: "",
    language: "",
    level: 0,
    profileexists: false
}

var goal = {
    name: "",
    deadline: "",
    timeleft: 0, // how long to reach your goal?  
    set: 0, // Your monetary goal 
    curtotal: 0, // Current total 
    remaining: 0, // How much left to reach goal: goal.set - goal.curtotal 
    challenges: false, // checks if the user has challenges
    goalset: false, // Checks if there is goal data on the user. Sends the user to the appropriate page 
    goalreached: false, // Checks if the user's financial goal was reached 
    saveData: function (ev) {
        alert(user.id);
        var sql = "UPDATE profile SET column1=value1,column2=value2 WHERE some_column=some_value";
        var sql = "INSERT INTO profile(name, email) VALUES('" + playerName + "', '" + playerEmails + "')";
        transaction.executeSql(sql, [],
            function (t, profile) {
                //output("inserted some stuff"); 
                playerDetails.push({
                    id: count,
                    displayName: tableName
                });
            });
        var sql = "SELECT id FROM profile WHERE name = '" + playerName + "'";
        transaction.executeSql(sql, [],
            function (t, profile) {
                //output("inserted some stuff"); 
                user.id = profile.id;
                playerDetails.push({
                    id: user.id
                });
            });
    }
}


function costModal(ev) {
    ev.preventDefault();
    document.querySelector("[data-role=overlay]").style.display = "block";
    document.querySelector("#deadlinepage").style.display = "none";
    document.querySelector("#costpage").style.display = "block";
    document.querySelector("#savecost").addEventListener("click", addToCost);

}

function dateModal(ev) {
    ev.preventDefault();
    document.querySelector("[data-role=overlay]").style.display = "block";
    document.querySelector("#costpage").style.display = "none";
    document.querySelector("#deadlinepage").style.display = "block";
    document.querySelector("#savegoal").addEventListener("click", addToGoal);
}

function addToGoal(ev) {
    alert("saving goal");
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


}

function addToCost(ev) {
    document.querySelector("[data-role=overlay]").style.display = "none";
    ev.preventDefault();
    document.querySelector("#costbox").innerHTML = "";

    var costBtn = document.createElement("input");
    costBtn.value = "$";
    costBtn.type = "button";
    costBtn.id = "cost";

    var costvalue = document.querySelector("#itemcost").value;
    goal.price = costvalue; // add the goal to the global price - this is a goal players will try to achieve 

    var goalp = document.createElement("p");

    goalp.innerHTML = "Current Goal: $ " + goal.price;

    document.querySelector("#costpage").style.display = "none";

    document.querySelector("#costbox").appendChild(costBtn);
    document.querySelector("#costbox").appendChild(goalp);

    gui.listenEvents();
}

function clearField() {
    // Clears the current value 
    this.value = "";
    document.querySelector("#" + this.id).style.color = "#333";
}

function calculateGoal() {
    goal.curtotal = 0;
    goal.calculate = goal.price - goal.curtotal;
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
    // Call this function to insert data about the person

function getFromForm(nameOfInput) {
    var value = $.trim(document.getElementById(nameOfInput).value);
    return value;
}

function insertProfile() {
    //var playerName = document.querySelector("#name").innerHTML; 
    // var playerEmail = document.querySelector("email").innerHTML; 
    // other player information
    // add to local storage for easier retrieval of user information (user id) which will be used to filter database information
    var sql = "INSERT INTO profile(firstName, lastName, ageRange, email, psw) VALUES('" + getFromForm("firstName") + "', '" + getFromForm("lastName") + "', '" + $('#signUpForm option:selected').attr('value') + "', '" + getFromForm("email") + "', '" + getFromForm("psw") + "')";
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

    /*var sql = "SELECT id FROM profile WHERE name = '" + playerName + "'";
        trans.executeSql(sql, [],
            function (t, profile) {
                //output("inserted some stuff"); 
                user.id = profile.id;
                playerDetails.push({
                    id: user.id
                });
            });
    */
}

function insertGoalIntoProfile() {
        var sql = "INSERT INTO profile(goalName, goalPrice, deadline) VALUES('" + getFromForm("goalName") + "', '" + getFromForm("goalPrice") + "', '" + getFromForm("deadline") + "')";
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
app.initialize();