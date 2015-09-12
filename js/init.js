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
        
        console.log(gui.getInfo('appInfo', 'json', 'profile'));
        init.initChecks();
    }
};
init.initialize();