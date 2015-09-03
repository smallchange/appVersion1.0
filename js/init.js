var funToLoad {
}
var init = {

    initialCheck: function () {
        if () {

        } else {}

        try {
            adddlert("Welcome guest!");
        } catch (err) {
            document.getElementById("demo").innerHTML = err.message;
        }
    },
    //$(edit_link).click(function(){ return changeViewMode(myvar); });
    //useFunction is a string
    ifTrue: function (ifTrue, useFunction) {
        if(validate.useFunction())
            return true;
    },
    initialCheckV2: function() {
            try {
                init.ifTrue()
                return validate.checkProfile();
            } catch (er1 //use error to do something) {
                try {
                    
                } catch (er2) {
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                    } catch (er3) {
                        try {
                            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                        } catch (er4) {
                            try {
                                return new ActiveXObject("Msxml2.XMLHTTP");
                            } catch (er5) {
                                try {
                                    return new ActiveXObject("Microsoft.XMLHTTP");
                                } catch (er6) {
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
    },
    example: function () {
        var returnState = false; // initialisation value is really up to the design
        try {
            returnState = true;
        } catch (a) {
            returnState = false;
        } finally {
            return returnState;
        }
    },
    initialize: function () {
        calender.setToday(); // sets today's date
        document.addEventListener("DOMContentLoaded", app.checkDetails);
        document.addEventListener('deviceready', app.checkDetails, false);
    },

}

init.initialize();