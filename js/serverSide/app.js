//if json doesn't work
//var tableName;
//var tables = [];
//var maxTables = 2;
//var playerDetails = [];
var clientWidth,
    clientHeight,
    app = {
        ip: "http://10.70.161.207:8888",
        dbhost: "http://10.70.161.207:8889",
        name: "smallChangeDb",
        db: openDatabase("smallChangeDb", '1.0', 'United Way - Small Change', 1024 * 1024),
    },
    // use functions to interact with the dom
    gui = {
        setView: function () {
            var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            $('body').css({
                'width': clientWidth,
                'height': clientHeight
            });
        },
        loadScript: function (dynamicScript) {
            $.getScript("ajax/scripts/" + dynamicScript + ".js")
                .done(function (script, textStatus) {
                    console.log(textStatus);
                })
                .fail(function (jqxhr, settings, exception) {
                    $("div.log").text("Triggered ajaxError handler.");
                });
        },
        htmlToDom: function (folderName, fileName, domDestination, callBack) {
            $.get('ajax/' + folderName + '/' + fileName + '.html', function () {}).done(function (data) {
                $('#' + domDestination + '').html(data);
            }).fail(function (er) {
                console.log(er);
            });
            if (callBack == null) {} else {
                callBack();
            }
        },
        slideSwitch: function (slideType, slideNum) {

            var negative = slideType + 'Negative',
                zero = slideType + 'Zero',
                positive = slideType + 'Positive';

            switch (slideNum) {
            case 'Zero':
                $("#" + zero).attr("data-state", "hideLeft");
                $("#" + positive).attr("data-state", "showRight");
                $("#" + negative).attr("data-state", "startRight");
                break;
            case 'Positive':
                $("#" + positive).attr("data-state", "hideLeft");
                $("#" + negative).attr("data-state", "showRight");
                $("#" + zero).attr("data-state", "startRight");
                break;
            case 'Negative':
                $("#" + negative).attr("data-state", "hideLeft");
                $("#" + zero).attr("data-state", "showRight");
                $("#" + positive).attr("data-state", "startRight");
                break;
            };
            setTimeout(function () {
                $('#' + slideType + slideNum + '').empty();
            }, 750);
        },
        loadSwitch: function (folderName, fileName, slideType, ev) {
            slideNum = $(ev.target).parents('section').addBack().first().attr('id').slice(slideType.length);

            var negative = slideType + 'Negative',
                zero = slideType + 'Zero',
                positive = slideType + 'Positive';

            switch (slideNum) {
            case 'Zero':
                domDestination = positive
                break;
            case 'Positive':
                domDestination = negative
                break;
            case 'Negative':
                domDestination = zero
                break;
            }
            gui.htmlToDom(folderName, fileName, domDestination, function () {
                gui.slideSwitch(slideType, slideNum);
            });

        },
        loadModal: function (fileName) {
            gui.htmlToDom('html/elements', 'newSlides', 'modal', function () {
                gui.htmlToDom('html/modals', fileName, 'newZero', function () {
                    $('#modal').attr('data-state', 'scrollUp');
                });

            });
        },
        loadModal2: function (fileName) {
            gui.htmlToDom('html/modals', fileName, 'modal2', function () {
                $('#modal2').attr('data-state', 'scrollUpExtra');
            });
        },
        //returns value through callBack from JSON, input strings in arguements
        returnJson: function (fileName, fileType, key, callBack) {
            $.getJSON('ajax/' + fileType + '/' + fileName + '.' + fileType, function (data) {}).done(function (data) {
                var valueReturned;
                $.each(data[fileName], function () {
                    var obj = this;
                    callBack(obj[key]);
                });
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        }
    },
    hammer = {
        swipe: function (dynamicObject, directionResult, callBack) {
            options = {
                dragLockToAxis: true,
                dragBlockHorizontal: true
            };
            // create a simple instance
            // by default, it only adds horizontal recognizers
            object = document.getElementById('' + dynamicObject + '');
            mc = new Hammer(object);
            //var mc = new Hammer(object, options);

            // listen to events...
            //var swipeGesture = "pan" + directionResult;
            mc.on('pan' + directionResult, function () {
                switch ('' + directionResult + '') {
                case 'right':
                    break;
                case 'left':
                    object.setAttribute('data-state', 'hideLeft');
                    break;
                case 'up':
                    object.setAttribute('data-state', 'scrollUp');
                    break;
                case 'down':
                    object.setAttribute('data-state', 'scrollDown');
                    break;
                }
                if (callBack == null) {} else {
                    callBack();
                }
            });
        },
    },
    // use functions to have interactions based on time and date
    calender = {
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
    },

    // use functions to get information from dom
    valuesFromDom = {
        //pull stuff from here
        addtogoal: function (ev) {
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
            console.log(nameOfInput);
            var value = $("#" + nameOfInput).val();
            console.log(value);
            return value;
        },
        getDate: function () {}
    },

    // use functions to interact with SQLite tables
    serverActions = {
        createTables: function (tableName) {
            var sql;
            if (tableName == "profile") {
                sql = 'CREATE TABLE profile (person_id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT(50), lastName TEXT(50), ageRange TEXT, email TEXT, psw TEXT, userLvl INTEGER, deadline TEXT, goalPrice INTEGER, goalName TEXT(255));';
                //t is still union, r is inserted stuff
                //level out of 10 how many hearts 
                //total hearts you have
                //pic src
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
                sql = 'CREATE TABLE ' + tableName + ' (challenge_id TEXT(50) PRIMARY KEY, challenge_name TEXT(100), challenge_desc TEXT(200), challenge_imgSrc TEXT(), price INTEGER);';

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
        },
        getLocalInfo: function (tableName, rowId, columnId, callBack) {
            //sql = 'SELECT' + columnId + ' FROM ' + tableName ' WHERE ' + rowId + ; 
            var stringReturned = rowId + columnId + tableName;
            console.log(stringReturned);
        }
    },
    //get info from Input from userSignUp page
    userActions = {
        createProfile: function (table) {
            var sql = "INSERT INTO profile(email, psw, userLvl) VALUES('" + valuesFromDom.getInput("email") + "', '" + valuesFromDom.getInput("psw") + "', 0)";
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
        createProfile2: function (table) {
            console.log($('#signUpForm option2:selected').attr('value'));
            var sql = "UPDATE profile SET firstName = '" + valuesFromDom.getInput("firstName") + "', lastName = '" + valuesFromDom.getInput("lastName") + "', ageRange = '" + $('#signUpForm option2:selected').attr('value') + "'";
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
        sqUpdate: function (inputType) {
            var sql = "UPDATE profile SET " + inputType + " = " + valuesFromDom.getInput(inputType) + " WHERE person_id = 1 ";
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
        //research
        insertNew: function () {
            var sql = "INSERT INTO Med(MedID) VALUES (?)";
            tx.executeSql(sql, [dataObj[i].MedID]);
        },
        insertProfileInfoOrig: function (table) {
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
    },

    // use functions to validate information
    stringGood = false,
    isValid = false,
    vN = "",
    svN = "",
    //callBack= "",
    validate = {
        //get general information about app from this json file 
        //arguement type is string
        /*
        appInfo: function (checkThis, callback) {

            $.getJSON('ajax/json/appInfo.json', function (data) {}).done(function (data) {
                $.each(data.appInfo, function () {
                    var obj = this;
                    callback(obj[checkThis]);
                    return
                });
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });    
        },
        */
        appInfo: function (checkThis, callback) {
            var returnedInfo = "";





            function getFromJson() {
                $.getJSON('ajax/json/appInfo.json', function (data) {}).done(function (data) {
                    $.each(data.appInfo, function () {
                        var obj = this;
                        var returnedInfo = obj[checkThis];
                        console.log(returnedInfo);
                        return returnedInfo;
                    });

                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    console.log("Request Failed: " + err);
                });
            };

            return getFromJson();
        },
        // use to check if current version number of app on device
        appVersionNum: function () {
            $.getJSON('ajax/json/appInfo.json', function (data) {}).done(function (data) {
                vN = data.versionNumber;
            });
            return vN;
        },
        //returns current installed app vN == versionNumber

        // use to check if current version number of app on UW server
        serverVersionNum: function () {},
        //returns current installed app sVN == serverVersionNumber

        // use to check if profile exists
        /* Anna's Code
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
        */
        checkProfile: function () {
            var tdata = "";
            var thisData = "";
            $.getJSON('ajax/json/appInfo.json', function (data) {}).done(function (data) {
                $.each(data, function (k, v) {
                    var thisData = data.profile;
                    data.profile;
                });

                //$.each(data, function () {
                //  var thisData = data;
                //var tdata = thisData.profile;
                //thisData.profile;
                //});
            });
            console.log(thisData);
            return;
        }, //Hassan
        //returns true=profileExists || false=noProfile

        //check if user is a guest
        isUserGuest: function () {
            return $.getJSON(url, function (data) {}).done(function (data) {
                data.challenge;
            });
        },
        //returns true=guestExists || false(user is notGuest

        //used to check if user has created challenges
        challengesCreated: function () {
            return $.getJSON(url, function (data) {}).done(function (data) {
                data.challenge;
            });
        },
        //returns true=challengeExists || false=noChallenges

        //use to check if user infromation from user inputs
        isFormEmpty: function () {
            return
        },
        //returns true=formEmpty || false=formNotEmpty

        //use to check if two values from two input fields = the same
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
        //returns true or false

        //check if user input is more than #value
        checkMinLength: function (input, minLength) {
            // This will be used to check names
            // for names: minimum of 2 characters 

            if (input.length >= minLength)
                stringGood = isValid = true;
            else
                stringGood = isValid = false;
        },
        //returns true or false

        //check if user input is more than a certain length
        checkLength: function (input, minLength, maxLength) {
            // Use this to set a restriction on the maximum number of characters 
            // This will be used to check passwords 
            if (input.length >= minLength && input.length <= maxLength)
                stringGood = isValid = true;
            else
                stringGood = isValid = false;
        },
        //returns true or false

        //checks if user inputed a valid email
        checkEmail: function (email) {
                // api http://blog.mailgun.com/free-email-validation-api-for-web-forms/
            }
            //returns true or false
    },

    // use functions for mathematical algorithms 
    algorithm = {
        //used to check if goal monetary value has been reached
        chkIfGoalReached: function () {
            goal.curtotal = 0;
            goal.calculate = goal.price - goal.curtotal;
        },
        add2Values: function (a, b) {
            var total = a + b;
            return total;
        }
    };

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