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
            gui.appendNewHtml('newUser', $('#slideNegative'))
            console.log(dynamicCase);
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
        //init.initChecks(validate.appInfo('profile', function(callback) {
        //  console.log(callback);
        //    return callback;
        //}));
        console.log(validate.appInfo('profile'));
        //console.log(validate.appVersionNum())
        //init.initChecks(returnedValue);
        //init.initChecks(validate.appInfo("profile"))

        //calender.setToday(); // sets today's date
        //document.addEventListener("DOMContentLoaded", init.loadScripts("loadScripts", $("head")));
        //document.addEventListener('deviceready', init.loadScripts());


        //document.addEventListener("DOMContentLoaded", init.initChecks(validate.checkProfile()));
        //document.addEventListener('deviceready', init.initChecks(validate.checkProfile()), false);
    },
}

init.initialize();