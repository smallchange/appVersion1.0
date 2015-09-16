jQuery.ajaxSetup({
    cache: true
});

var init = {
    loadScripts: function (dynamicArgument, dynamicDestination) {
        $.get('ajax/html/' + dynamicArgument + '.html', function (data) {
            $(dynamicDestination).html(data);
        });
        return;
    },
    initChecks: function (dynamicCase) {
        var profileExists = dynamicCase,
            noProfile = dynamicCase,
            guestExists = dynamicCase,
            noGuest = dynamicCase,
            challengeExists = dynamicCase,
            noChallenges = dynamicCase;

        switch (dynamicCase) {
        case profileExists:
            gui.appendNewHtml('newUser', $('#slideZero'))
            break;
        case noProfile:
            gui.appendNewHtml('newUser', $('#slideZero'))
            break;
        case guestExists:
            init.check(validate.challengesCreated());
            break;
        case noGuest:
            gui.slideSwitch();
            //skip to initail setup
            break;
        case challengeExists:
            gui.slideSwitch();
            //skip to home
            break;
        case noChallenges:
            gui.slideSwitch();
            //skip to choose challenge
            break;
        }
    },
    initialize: function () {
        //var t = function () { gui.getval( ) 
        /*
                var p = gui.getInfo('appInfo', 'json', 'profile', function(value){
                    return value;
                });
                */
        var value = "";
        (function () {
            $.getJSON('ajax/json/appInfo.json', function (data) {}).done(function (data) {
                value = data.appInfo[0].profile;
                /*$.each(data, function (i , k) {
                    var obj = data.appInfo;
                    console.log(obj[0].profile);
                    return obj[0].profile;
                });*/

                return;
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        })();
        //gui.getInfoTest('appInfo', 'json', 'profile', function () {});
        console.log(value);
        init.initChecks(value);
    }
};
init.initialize();