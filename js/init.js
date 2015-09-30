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
        console.log(dynamicCase);
        switch (dynamicCase) {
        case "profileExists":
            gui.htmlToDom('html', 'newUser', 'slideNegative');
            break;
        case "noProfile":
            gui.htmlToDom('html', 'intro', 'slideZero', null);
            //init.initChecks(validate.challengesCreated());
            break;
        case "challengeExists":
            gui.slideSwitch();
            //skip to home
            break;
        case "noChallenges":
            gui.slideSwitch();
            //skip to choose challenge
            break;
        }
    },
    initialize: function () {
        gui.setView();
        //getting value from profile key in JSON
        gui.returnJson('appInfo', 'json', 'profile', function (info) {
            //CHECK if there is a profile
            init.initChecks(info);

            //serverActions.getLocalInfo(5, 4, 1)
        });
    }
};
init.initialize();